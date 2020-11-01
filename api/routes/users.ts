import { Request, Response, Router } from "express";

// https://github.com/seanpmaxwell/express-generator-typescript/tree/265df43a2cb23a4389a0361530bb741d1fc88c7b

const router = Router();

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    return res.status(200).json({bob: "hello"});
});



/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post('/add', async (req: Request, res: Response) => {
    // const { user } = req.body;
    // return res.status(200).end();
    throw "Unimplemented";
});

export default router;