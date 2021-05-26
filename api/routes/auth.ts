import { Request, Response, Router, NextFunction, response } from "express";
import * as mongoose from "mongoose";
import UserController from "../controllers/UserController";
import User, { IUser } from "../models/User"

const router = Router();

// set authenticate to false to disable authentication
const AUTHENTICATION_ENABLED = true;

/**
 * Using the access token provided, check to make sure that
 * you are, indeed, a verified user.
 */
function isUser(req: Request, res: Response, next: NextFunction) {
  let token: string = req.body.token;
  
  if (!AUTHENTICATION_ENABLED) {
    return next();
  }
  UserController.getByToken(token, (err: any, user: any) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }
    if (user) {
      req.body.user = user;
      return next();
    }
    return res.status(401).send({
      message: "Failed authentication for admin",
    });
  });
}

/**
 * Using the access token provided, check to make sure that
 * you are, indeed, an admin.
 */
function isAdmin(req: Request, res: Response, next: NextFunction) {
  let token: string = req.body.token;

  if (!AUTHENTICATION_ENABLED) {
    return next();
  }
  UserController.getByToken(token, (err: any, user: any) => {
    if (err) {
      console.log(err);
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
 * Register a user with a username and password
 * Fails if password too short or username already exists
 * body {
 *  username: username,
 *  password: password,
 *  isAdmin: false
 * }
 */
router.post("/register", (req: Request, res: Response) => {
  let { username, password, isAdmin } = req.body;

  UserController.createUser(username, password, isAdmin, (err:string, user:IUser) => {
    if (err != null) {
      return res.status(401).send(err);
    }
    return res.status(200).json({user: user});
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
  router.post('/login',
    function(req: Request, res: Response, next){
      let username = req.body.username;
      let password = req.body.password;
      let token = req.body.token;

      if (token) {
        UserController.loginWithToken(token, (err, token, user) => {
          if (err || !user) {
            return res.status(400).send(err);
          }
          
          return res.json({
            token: token,
            user: user,
            isAdmin: user.isAdmin,
          });
        })
      } else {
        UserController.loginWithPassword(
          username,
          password,
          (err, token, user) => {
            if (err || !user) {
              return res.status(401).send(err);
            }
            
            return res.json({
              token: token,
              user: user,
              isAdmin: user.isAdmin,
            });
          }
        );
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
  UserController.getByToken(token, (err: any, user: any) => {
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
      isAdmin: user.isAdmin
    });
    
  });
});


export default router;
export { isUser, isAdmin };