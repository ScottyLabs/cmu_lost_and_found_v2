import { Request, Response, Router, NextFunction } from "express";
import Item from "../models/Item";
import ImageController from "../controllers/ImageController";
import UserController from "../controllers/UserController";
import { isUser, isAdmin } from "./auth";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import PermissionsController from "../controllers/PermissionsController";
import e = require("express");

const router = Router();

/**
 * Returns all items in database, according to schema specified in Item.ts
 */
router.post("/all", isUser, async (req: Request, res: Response) => {
  Item.find()
    .sort({ dateFound: -1, timeFound: -1 })
    .exec(function (err, docs) {
      if (err) {
        console.log(err);
        return res.status(401).send(err);
      }
      return res.status(200).json(docs);
    });
});

/**
 * Adds an item to database
 * Should correspond to schema found in Item.ts
 */
//TODO: Still need add item validation (in case some fields aren't satisfactory)
router.post("/add", isUser, async (req: Request, res: Response) => {
  let {
    dateFound,
    timeFound,
    name,
    whereFound,
    description,
    whereToRetrieve,
    building,
    image,
    imagePermission,
    status,
    approved,
    user,
    notes,
  } = req.body;
  if (
    process.env.AUTH_ENABLED === "true" &&
    !PermissionsController.hasPermissionsWithUser(
      building as BuildingType,
      PermissionType.USER,
      user
    )
  ) {
    return res.status(403).send(new Error("Insufficient privileges"));
  }
  let item = new Item({
    dateFound: new Date(dateFound),
    timeFound: timeFound,
    name: name,
    whereFound: whereFound,
    description: description,
    whereToRetrieve: whereToRetrieve,
    building: building,
    image: image,
    imagePermission: imagePermission,
    status: status,
    approved: approved,
    notes: notes,
  });
  item.save((err) => {
    if (err) {
      console.log(err);
      return res.status(401).send(err);
    }
    return res.status(200).json({ id: item._id });
  });
});

/**
 * Delete an item by id
 * {
 * id: id
 * }
 */
router.post("/delete", isUser, async (req: Request, res: Response) => {
  let id = req.body.id;
  const user = req.body.user;
  try {
    const item = await Item.findById(id);
    if (item) {
      if (
        PermissionsController.hasPermissionsWithUser(
          item.building as BuildingType,
          item.approved ? PermissionType.ADMIN : PermissionType.USER,
          user
        )
      ) {
        const deletedItem = await Item.findByIdAndDelete(id);
        return res.status(200).send({ msg: deletedItem });
      } else {
        return res.status(403).send(new Error("Insufficient privileges"));
      }
    } else {
      return res.status(404).send(new Error("Item not found"));
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Updates an item's status by id
 * {
 * id: id
 * status: status
 * }
 */
router.post("/updateStatus", isUser, async (req: Request, res: Response) => {
  let id = req.body.id;
  let status = req.body.status;
  const user = req.body.user;
  try {
    const item = await Item.findById(id);
    if (item) {
      if (
        PermissionsController.hasPermissionsWithUser(
          item.building as BuildingType,
          PermissionType.USER,
          user
        )
      ) {
        const updatedItem = await Item.findByIdAndUpdate(
          id,
          { status: status },
          { runValidators: true, useFindAndModify: false }
        );
        return res.status(200).send({ msg: updatedItem });
      } else {
        return res.status(403).send(new Error("Insufficient privileges"));
      }
    } else {
      return res.status(404).send(new Error("Item not found"));
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Updates an item's approved status by id
 * {
 * id: id
 * approved: approved
 * }
 */
router.post(
  "/updateApprovedStatus",
  isUser,
  async (req: Request, res: Response) => {
    let id = req.body.id;
    let approved = req.body.approved;
    const user = req.body.user;
    try {
      const item = await Item.findById(id);
      if (item) {
        if (
          PermissionsController.hasPermissionsWithUser(
            item.building as BuildingType,
            PermissionType.ADMIN,
            user
          )
        ) {
          const updatedItem = await Item.findByIdAndUpdate(
            id,
            { approved: approved },
            { runValidators: true, useFindAndModify: false }
          );
          return res.status(200).send({ msg: updatedItem });
        } else {
          return res.send(403).send(new Error("Insufficient privileges"));
        }
      } else {
        return res.status(404).send(new Error("Item not found"));
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  }
);

/**
 * Edits an item
 * {
 * id: id
 * status: status
 * }
 */
router.post("/editItem", isUser, async (req: Request, res: Response) => {
  let {
    id,
    token,
    dateFound,
    timeFound,
    name,
    whereFound,
    description,
    whereToRetrieve,
    building,
    image,
    imagePermission,
    status,
    user,
    notes,
  } = req.body;
  try {
    const item = await Item.findById(id);
    if (item) {
      if (
        PermissionsController.hasPermissionsWithUser(
          item.building as BuildingType,
          PermissionType.USER,
          user
        )
      ) {
        const updatedItem = await Item.findByIdAndUpdate(
          id,
          {
            status: status,
            token: token,
            dateFound: dateFound,
            timeFound: timeFound,
            name: name,
            whereFound: whereFound,
            building: building,
            description: description,
            // category: category,
            whereToRetrieve: whereToRetrieve,
            image: image,
            imagePermission: imagePermission,
            notes: notes,
          },
          { runValidators: true, useFindAndModify: false }
        );
        return res.status(200).send({ msg: updatedItem });
      } else {
        return res.status(403).send(new Error("Insufficient privileges"));
      }
    } else {
      return res.status(404).send(new Error("Item not found"));
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send(err);
  }
});

/**
 * Adds an image to Google Drive
 * {
 * imageName: imageName
 * dataURL: dataURL
 * }
 *
 * Returns the finalURL
 */
router.post("/addImage", isUser, async (req: Request, res: Response) => {
  let imageName = req.body.imageName;
  let dataURL = req.body.dataURL;
  
  if (req.body.user?.permissions?.length > 0) {
    ImageController.sendImageToDrive(
      imageName,
      dataURL,
      (err: any, finalURL: any) => {
        if (err) {
          console.log(err);
          return res.status(401).send(err);
        }
        return res.status(200).send({ msg: finalURL });
      }
    );
  }
});
// Item.updateOne({_id: id}, { $set: {status: status} }, {runValidators: true}, (err, raw) => {
//   if (err) {
//     console.log(err);
//     return res.status(401).send({trace: err, msg: "can't find item in db"});
//   }
//   return res.status(200).send({msg: raw});
// });

export default router;
