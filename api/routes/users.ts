import { Request, Response, Router } from "express";
import User, {IUser} from "../models/User";
import { isUser, isAdmin } from "./auth";

// https://github.com/seanpmaxwell/express-generator-typescript/tree/265df43a2cb23a4389a0361530bb741d1fc88c7b

const router = Router();

/******************************************************************************
 *                      Get All Users - "GET /api/accounts/all"
 ******************************************************************************/

router.post('/all', isAdmin, async (req: Request, res: Response) => {
    User.find((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(401).send(err);
    }
    return res.status(200).json(docs);
  });
});



/******************************************************************************
 *                       Add One - "POST /api/accounts/add"
 ******************************************************************************/

/**
 * Update permissions
 * {
 *  username: "bob",
 *  perm: "isAdmin",
 *  isChecked: "true"
 * }
 */
router.post('/updatePerm', isAdmin, async (req: Request, res: Response) => {
    let { username, perm, isChecked } = req.body;
    if (perm !== "isAdmin") {
        console.log("admin privilege doesn't exist");
        return res.status(406).send({msg: "this admin privilege doesn't exist"})
    }

    User.findOneAndUpdate({username: username}, {[perm]: isChecked}, {runValidators: true, useFindAndModify: false, new: true}, (err, raw) => {
        if (err) {
            console.log(err);
            return res.status(401).send({trace: err, msg: "can't find item in db"});
        }
        return res.status(200).send({msg: raw});
    });
});

/**
 * Delete user
 * {
 *  username: "bob"
 * }
 */

router.post('/delete', isAdmin, async (req: Request, res: Response) => {
    let { username } = req.body;
    User.findOneAndDelete({username: username}, (err: any, raw: IUser) => {
        if (err) {
            console.log(err);
            return res.status(401).send({trace: err, msg: "can't find item in db"});
        }
        return res.status(200).send({msg: raw});
        
    });
})

export default router;
