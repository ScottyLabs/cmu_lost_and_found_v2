import { Request, Response, Router, NextFunction } from "express";
import Item from "../models/Item";
import ImageController from "../controllers/ImageController";
import UserController from "../controllers/UserController";
import { isUser, isAdmin } from "./auth";

const router = Router();

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
router.post("/add", isUser, async (req: Request, res: Response) => {
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
router.post("/delete", isUser, async (req: Request, res: Response) => {
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
router.post("/updateStatus", isUser, async (req: Request, res: Response) => {
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
router.post("/updateApprovedStatus", isAdmin, async (req: Request, res: Response) => {
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
<<<<<<< HEAD
router.post("/editItem", async (req: Request, res: Response) => {
  let {
    id,
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
  } = req.body;

  Item.findByIdAndUpdate({_id: req.body.id}, {dateFound: req.body.dateFound, timeFound: req.body.timeFound, name:req.body.name, whereFound:req.body.whereFound, description: req.body.description, 
    category: req.body.category, whereToRetrieve: req.body.whereToRetrieve, image:req.body.image, imagePermission:req.body.imagePermission, status: req.body.status}, {runValidators: true, useFindAndModify: false}, (err, raw) => {
=======
router.post("/editItem", isUser, async (req: Request, res: Response) => {
  let id = req.body.id;
  let status = req.body.status;
  Item.findByIdAndUpdate({ _id: id }, { status: status }, { runValidators: true, useFindAndModify: false }, (err, raw) => {
>>>>>>> 59a20bcdcb2a5de8aa043b560c95fe801088b321
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
router.post("/addImage", isUser, async (req: Request, res: Response) => {
  let imageName = req.body.imageName;
  let dataURL = req.body.dataURL;
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
