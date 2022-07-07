import ImageController from "../controllers/ImageController";
import PermissionsController from "../controllers/PermissionsController";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import Item from "../models/Item";
import { isUser } from "./auth";

import { Request, Response, Router } from "express";

const router = Router();

/**
 * Returns all items in database, according to schema specified in Item.ts
 */
router.post("/all", isUser, async (req: Request, res: Response) => {
  Item.find()
    .populate("whereToRetrieve")
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
  const {
    dateFound,
    timeFound,
    name,
    whereFound,
    description,
    value,
    identifiable,
    building,
    image,
    imagePermission,
    status,
    approved,
    identification,
    notes,
    user,
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
  const item = new Item({
    dateFound: new Date(dateFound),
    timeFound: timeFound,
    name: name,
    whereFound: whereFound,
    description: description,
    value: value,
    identifiable: identifiable,
    building: building,
    image: image,
    imagePermission: imagePermission,
    status: status,
    approved: approved,
    publicDisplay: false,
    identification: identification,
    notes: notes,
    username: user.username,
    modified: [user.username],
    approver: approved ? user.username : null,
    returner: null,
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
  const id = req.body.id;
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
 * Archives items by ids
 * {
 * ids: ids
 * archived: archived
 * }
 */
router.post("/archive", isUser, async (req: Request, res: Response) => {
  const ids = req.body.ids;
  const archived = req.body.archived;
  const user = req.body.user;
  let updatedItems = []
  for (const id of ids) {
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
            { archived: archived },
            { runValidators: true, useFindAndModify: false }
          );
          updatedItems.push(updatedItem);
        } else {
          return res.status(403).send(new Error("Insufficient privileges"));
        }
      } else {
        return res.status(404).send(new Error("Item not found"));
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  return res.status(200).send({ msg: updatedItems });
});

/**
 * Updates an item's status by id
 * {
 * id: id
 * status: status
 * }
 */
router.post("/updateStatus", isUser, async (req: Request, res: Response) => {
  const id = req.body.id;
  const status = req.body.status;
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
          {
            status: status,
            returner: status === "claimed" ? user.username : null,
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
    const id = req.body.id;
    const approved = req.body.approved;
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
            { approved: approved, approver: approved ? user.username : null },
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
 * Updates an item's publicDisplay status by id
 * {
 * id: id
 * publicDisplay: publicDisplay
 * }
 */
router.post(
  "/updatePublicDisplayStatus",
  isUser,
  async (req: Request, res: Response) => {
    const id = req.body.id;
    const publicDisplay = req.body.publicDisplay;
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
            { publicDisplay: publicDisplay },
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
  const {
    id,
    token,
    dateFound,
    timeFound,
    name,
    whereFound,
    description,
    value,
    identifiable,
    building,
    image,
    imagePermission,
    status,
    identification,
    notes,
    user,
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
        const updatedItem =
          item.modified[item.modified.length - 1] === user.username
            ? await Item.findByIdAndUpdate(
                id,
                {
                  $set: {
                    status: status,
                    token: token,
                    dateFound: dateFound,
                    timeFound: timeFound,
                    name: name,
                    whereFound: whereFound,
                    building: building,
                    description: description,
                    value: value,
                    identifiable: identifiable,
                    image: image,
                    imagePermission: imagePermission,
                    identification: identification,
                    notes: notes,
                    publicDisplay: item.publicDisplay
                      ? value == "general" && !identifiable
                      : false,
                    username: user.username,
                  },
                },
                { runValidators: true, useFindAndModify: false }
              )
            : await Item.findByIdAndUpdate(
                id,
                {
                  $set: {
                    status: status,
                    token: token,
                    dateFound: dateFound,
                    timeFound: timeFound,
                    name: name,
                    whereFound: whereFound,
                    building: building,
                    description: description,
                    value: value,
                    identifiable: identifiable,
                    image: image,
                    imagePermission: imagePermission,
                    identification: identification,
                    notes: notes,
                    publicDisplay: item.publicDisplay
                      ? value == "general" && !identifiable
                      : false,
                    username: user.username,
                  },
                  $push: {
                    modified: user.username,
                  },
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
    console.error(err);
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
  const imageName = req.body.imageName;
  const dataURL = req.body.dataURL;

  if (req.body.user?.permissions?.length > 0) {
    ImageController.sendImageToDrive(
      imageName,
      dataURL,
      // TODO: #147 Replace any with appropriate type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default router;
