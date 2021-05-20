import { Request, Response, Router, NextFunction } from "express";
import Item from "../models/Item";
const router = Router();

import ImageController from "../controllers/ImageController";
import UserController from "../controllers/UserController";

/**
 * Using the access token provided, check to make sure that
 * you are, indeed, an admin.
 */
function isAdmin(req: Request, res: Response, next: NextFunction) {
  let token: string = req.body.token;
  UserController.getByToken(token, (err: any, user: any) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (user && user.isAdmin) {
      req.body.user = user;
      return next();
    }
    return res.status(401).send({
      message: "Failed authentication for admin",
    });
  });
}

/**
 * Returns all items in database, according to schema specified in Item.ts
 */
router.get("/all", async (req: Request, res: Response) => {
  Item.find().sort({ dateFound: -1, timeFound: -1 }).exec(function (err, docs) {
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
router.post("/add", isAdmin, async (req: Request, res: Response) => {
  let {
    dateFound,
    timeFound,
    name,
    whereFound,
    description,
    category,
    whereToRetrieve,
    image,
    imagePermission,
    status,
    approved,
  } = req.body;
  let item = new Item({
    dateFound: new Date(dateFound),
    timeFound: timeFound,
    name: name,
    whereFound: whereFound,
    description: description,
    category: category,
    whereToRetrieve: whereToRetrieve,
    image: image,
    imagePermission: imagePermission,
    status: status,
    approved: approved,
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
router.post("/delete", isAdmin, async (req: Request, res: Response) => {
  let id = req.body.id;
  Item.findByIdAndDelete({ _id: id }, (err, raw) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ trace: err, msg: "can't find item in db" });
    }
    return res.status(200).send({ msg: raw });
  });

});

/**
 * Updates an item's status by id
 * {
 * id: id
 * status: status
 * }
 */
router.post("/updateStatus", isAdmin, async (req: Request, res: Response) => {
  let id = req.body.id;
  let status = req.body.status;
  Item.findByIdAndUpdate({ _id: id }, { status: status }, { runValidators: true, useFindAndModify: false }, (err, raw) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ trace: err, msg: "can't find item in db" });
    }
    return res.status(200).send({ msg: raw });
  });

});

/**
 * Updates an item's approved status by id
 * {
 * id: id
 * approved: approved
 * }
 */
router.post("/updateApprovedStatus", async (req: Request, res: Response) => {
  let id = req.body.id;
  let approved = req.body.approved;
  Item.findByIdAndUpdate({ _id: id }, { approved: approved }, { runValidators: true, useFindAndModify: false }, (err, raw) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ trace: err, msg: "can't find item in db" });
    }
    return res.status(200).send({ msg: raw });
  });

});

/**
 * Edits an item
 * {
 * id: id
 * status: status
 * }
 */
router.post("/editItem", isAdmin, async (req: Request, res: Response) => {
  let id = req.body.id;
  let status = req.body.status;
  Item.findByIdAndUpdate({ _id: id }, { status: status }, { runValidators: true, useFindAndModify: false }, (err, raw) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ trace: err, msg: "can't find item in db" });
    }
    return res.status(200).send({ msg: raw });
  });

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
router.post("/addImage", isAdmin, async (req: Request, res: Response) => {
  console.log("Attempting to add image")

  var imageName = req.body.imageName;
  var dataURL = req.body.dataURL;
  ImageController.sendImageToDrive(imageName, dataURL,
    (err: any, finalURL: any) => {
      if (err) {
        console.log(err);
        return res.status(401).send(err);
      }
      return res.status(200).send({ msg: finalURL })
    });
});
// Item.updateOne({_id: id}, { $set: {status: status} }, {runValidators: true}, (err, raw) => {
//   if (err) {
//     console.log(err);
//     return res.status(401).send({trace: err, msg: "can't find item in db"});
//   }
//   return res.status(200).send({msg: raw});
// });

export default router;
