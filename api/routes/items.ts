import { Request, Response, Router } from "express";
import Item from "../models/Item"
const router = Router();

router.get("/additem", async (req: Request, res: Response) => {
  console.log("got here")
  let phone = new Item({name: "Phone", description: "Black iPhone with pink case", foundLoc: "Gates",
                        retrievalLoc: "Gates"});
  phone.save(function (err) {
    if (err) console.log(err);
    else console.log("added")
  });
  return res.status(200).json({ bob: "hello" });
});

export default router;