import { Request, Response, Router } from "express";
import Item from "../models/Item"
const router = Router();

router.post("/additem", async (req: Request, res: Response) => {
  console.log("adding item");

  var item = new Item({'name': req.body.name, 'description': req.body.description, 'dateFound': req.body.dateFound,
  'category': req.body.category, 'foundLoc': req.body.foundLoc, 'retrievalLoc': req.body.retrievalLoc, 
  'contactInfo': {'email': req.body.email, 'phone': req.body.phone}, 'image': req.body.image, 'imagePermission': req.body.imagePermission });

  item.save(function (err) {
    if (err) console.log(err);
    else console.log("added")
  });
  
  return res.status(200).json({ bob: "hello" });
});

router.get("/remitem", async (req: Request, res: Response) => {
  console.log("removing item")

  
  Item.remove({'name': req.body.name, 'description': req.body.description});
  //or should you be removing the object?
  //Item.remove({'id': req.body.id})

  return res.status(200).json({ bob: "hello" });
});

export default router;