import { Request, Response, Router } from "express";
import Item from "../models/Item";
const router = Router();

import ImageController from "../controllers/ImageController";

/**
 * Returns all items in database, according to schema specified in Item.ts
 */
router.get("/all", async (req: Request, res: Response) => {
  Item.find((err, docs) => {
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
router.post("/add", async (req: Request, res: Response) => {
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
  } = req.body;
  let item = new Item({
    dateFound: dateFound,
    timeFound: timeFound,
    name: name,
    whereFound: whereFound,
    description: description,
    category: category,
    whereToRetrieve: whereToRetrieve,
    image: image,
    imagePermission: imagePermission,
    status: status,
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
 * Updates an item's status by id
 * {
 * id: id
 * status: status
 * }
 */
router.post("/updateStatus", async (req: Request, res: Response) => {
  let id = req.body.id;
  let status = req.body.status;
  console.log(id);
  console.log(status);
  Item.findByIdAndUpdate({_id: id}, {status: status}, {runValidators: true, useFindAndModify: false}, (err, raw) => {
    if (err) {
      console.log(err);
      return res.status(401).send({trace: err, msg: "can't find item in db"});
    }
    return res.status(200).send({msg: raw});
  });
  // Item.updateOne({_id: id}, { $set: {status: status} }, {runValidators: true}, (err, raw) => {
  //   if (err) {
  //     console.log(err);
  //     return res.status(401).send({trace: err, msg: "can't find item in db"});
  //   }
  //   return res.status(200).send({msg: raw});
  // });

});

router.post("/addImage", async (req: Request, res: Response) => {
  console.log("ATTEMPTING TO ADD IMAGE")
  
  var resumeName = req.body.resumeName;
  var dataURL = req.body.dataURL
  ImageController.sendResumeToDrive(resumeName, dataURL,
    (err : any, finalURL : any) => {
    if (err) {
      console.log(err);
      return res.status(401).send(err);
    }
    return res.status(200).send({msg: finalURL})
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
