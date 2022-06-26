import PermissionsController from "../controllers/PermissionsController";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import User, { IUser } from "../models/User";
import { isAdmin, isUser } from "./auth";

import { Request, Response, Router } from "express";

// https://github.com/seanpmaxwell/express-generator-typescript/tree/265df43a2cb23a4389a0361530bb741d1fc88c7b

const router = Router();

/******************************************************************************
 *                      Get All Users - "POST /api/accounts/all"
 ******************************************************************************/

router.post("/all", isUser, async (req: Request, res: Response) => {
  User.find((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(401).send(err);
    }
    return res.status(200).json(docs);
  });
});

/******************************************************************************
 *                      Get Current User - "POST /api/accounts/currentUser"
 ******************************************************************************/

router.post("/currentUser", isUser, (req, res) => {
  return res.status(200).json(req.body.user);
});

/******************************************************************************
 *                       Add One - "POST /api/accounts/add"
 ******************************************************************************/

/**
 * Update permissions
 * {
 *  username: "bob",
 *  perm: ["BLDG:ACTION"]
 * }
 * Required Permission ALL:ADMIN
 */
router.post("/updatePerm", isAdmin, async (req: Request, res: Response) => {
  const { username, perm } = req.body;
  const permissionArray: Array<[BuildingType, PermissionType]> = perm
    .map((value: string) => PermissionsController.parsePermission(value))
    .filter((value: [BuildingType, PermissionType]) => value);
  if (permissionArray) {
    try {
      const toUpdate = await User.findOneByUsername(username);
      if (toUpdate) {
        const updated = await User.findByIdAndUpdate(
          toUpdate._id,
          {
            permissions: permissionArray.map(
              (value) => `${String(value[0])}:${String(value[1])}`
            ),
          },
          { runValidators: true, useFindAndModify: false, new: true }
        );
        return res.status(200).send({ msg: updated });
      } else {
        return res.status(404).send(new Error("User not found"));
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    console.log("Invalid permissions");
    return res.status(406).send({ msg: "Invalid permissions" });
  }
});

/**
 * Delete user
 * {
 *  username: "bob"
 * }
 * Required Permission ALL:ADMIN
 */

router.post("/delete", isAdmin, async (req: Request, res: Response) => {
  const { username } = req.body;
  User.findOneAndDelete({ username: username }, (err: any, raw: IUser) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ trace: err, msg: "can't find item in db" });
    }
    return res.status(200).send({ msg: raw });
  });
});

/**
 * Update notification status
 * {
 *  username: "bob",
 *  notif: true or false
 * }
 */
router.post("/updateNotif", async (req: Request, res: Response) => {
  const { username, notif } = req.body;
  const toUpdate = await User.findOneByUsername(username);
  if (toUpdate) {
    const updated = await User.findByIdAndUpdate(
      toUpdate._id,
      {
        notif: notif,
      },
      { runValidators: true, useFindAndModify: false, new: true }
    );
    return res.status(200).send({ msg: updated });
  } else {
    return res.status(404).send(new Error("User not found"));
  }
});

export default router;
