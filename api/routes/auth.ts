/**
 * Responsible for authentication on the backend.
 */

import { Request, Response, Router, NextFunction, response } from "express";
import * as mongoose from "mongoose";
import UserController from "../controllers/UserController";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import User, { IUser } from "../models/User";
import * as jwt from "jsonwebtoken";

const router = Router();

/**
 * Using the access token provided, check to make sure that
 * you are, indeed, a verified user.
 */
function isUser(req: Request, res: Response, next: NextFunction) {
  let token: string = req.body.token;

  if (process.env.AUTH_ENABLED !== "true") {
    return next();
  }
  UserController.getByToken(token, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).send(err);
    }
    if (user) {
      req.body.user = user;
    }
    return next();
  });
}

/**
 * Using the access token provided, check to make sure that
 * you are, indeed, an admin.
 */
function isAdmin(req: Request, res: Response, next: NextFunction) {
  let token: string = req.body.token;

  if (process.env.AUTH_ENABLED !== "true") {
    return next();
  }
  UserController.getByToken(token, (err: any, user: IUser) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (
      user &&
      user.permissions.includes(
        `${String(BuildingType.ALL)}:${String(PermissionType.ADMIN)}`
      )
    ) {
      req.body.user = user;
      return next();
    } else if (user) {
      return res.status(403).send({
        message: "Insufficient privileges",
      });
    }
    return res.status(401).send({
      message: "Failed authentication for admin",
    });
  });
}

/**
 * Register a user with a username and password
 * Fails if password too short or username already exists
 * body {
 *  username: username,
 *  password: password,
 *  isAdmin: false
 * }
 */
// router.post("/register", (req: Request, res: Response) => {
//   let { username, password, isAdmin } = req.body;

//   UserController.createUser(
//     username,
//     password,
//     isAdmin,
//     (err: string, user: IUser) => {
//       if (err != null) {
//         return res.status(401).send(err);
//       }
//       return res.status(200).json({ user: user });
//     }
//   );
// });

router.post("/create", isAdmin, (req, res) => {
  let { username, permissions } = req.body;
  UserController.createUser(username, permissions, (err: string, user: IUser) => {
    if (err != null) {
      return res.status(401).send(err);
    }
    return res.status(200).json({ user });
  })
});

/**
 * Login a user with a username and password.
 * Otherwise, 401.
 *
 * body {
 *  username, username
 *  password: password
 * }
 *
 */
router.post("/login", function (req: Request, res: Response, next) {
  let token = req.body.token;

  if (token) {
    UserController.loginWithToken(token, (err, token, user) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.json({
        token: token,
      });
    });
  } else {
    return res.status(400).send(new Error("No token provided"));
  }
});

router.get("/signRequest", function (req, res) {
  try {
    const loginRequest = jwt.sign(
      {
        redirectUrl: process.env.LNF_HOST,
        restrictDomain: process.env.LNF_HOST.includes("localhost") ? false : true,
        applicationId: process.env.LOGIN_API_ID,
      },
      process.env.JWT_SECRET || "",
      { algorithm: "RS256", expiresIn: "5 minutes" }
    );
    res.json({ token: loginRequest });
  } catch {
    const loginRequest = jwt.sign(
      {
        redirectUrl: process.env.LNF_HOST,
        restrictDomain: process.env.LNF_HOST.includes("localhost") ? false : true,
        applicationId: process.env.LOGIN_API_ID,
      },
      process.env.JWT_SECRET || "",
      { algorithm: "HS256", expiresIn: "5 minutes" }
    );
    res.json({ token: loginRequest });
  }
});

// UNUSED
router.post("/logout", function (req: Request, res: Response, next) {
  // TODO: no idea what to do here:
});

/**
 * Checks if current user is admin
 */
router.post("/isAdmin", async (req: Request, res: Response) => {
  let token: string = req.body.token;
  UserController.getByToken(token, (err: any, user: IUser) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(500).send({
        message: "User not found",
      });
    }
    return res.json({
      isAdmin: user.permissions.includes(
        `${String(BuildingType.ALL)}:${String(PermissionType.ADMIN)}`
      ),
    });
  });
});

export default router;
export { isUser, isAdmin };
