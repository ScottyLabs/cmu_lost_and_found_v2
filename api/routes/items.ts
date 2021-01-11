import { Request, Response, Router } from "express";
import Item from "../models/Item";
const router = Router();

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
 * Removes an item by id
 * {
 * id: id
 * }
 */
router.post("/remove", async (req: Request, res: Response) => {
  let id = req.body.id;
  Item.deleteOne({_id: id}, (err) => {
    if (err) {
      console.log(err);
      return res.status(401).send(err);
    }
    return res.status(200).send("success");
  });
  
});

export default router;
