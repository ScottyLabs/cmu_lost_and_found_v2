import { Request, Response, Router, NextFunction } from "express";
import * as mongoose from "mongoose";
import UserController from "../controllers/UserController";
import User, { IUser } from "../models/User"
// const User = require("../models/User")
const router = Router();

function getToken(req: Request) {
  return req.headers['x-access-token'][0];
}

/**
 * Using the access token provided, check to make sure that
 * you are, indeed, an admin.
 */
function isAdmin(req: Request, res: Response, next: NextFunction){
  let token: string = getToken(req);
  UserController.getByToken(token, (err:any, user:any) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (user && user.admin){
      req.body.user = user;
      return next();
    }
    return res.status(401).send({
      message: 'Failed authentication for admin'
    });
  });
}

function isOwner(req: Request, res: Response, next: NextFunction) {
  var token = getToken(req);
  UserController.getByToken(token, (err:any, user:any) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (user && user.owner) {
      req.body.user = user;
      return next();
    }
    return res.status(401).send({
      message: "Failed authentication for owner",
    });
  });
}

/**
 * Register a user with a username and password
 * Fails if password too short or username already exists
 * body {
 *  username: username,
 *  password: password
 * }
 */
router.post("/register", (req: Request, res: Response) => {
  let username = req.body.username;
  let password = req.body.password;

  UserController.createUser(username, password, (err:string, user:IUser) => {
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
            user: user
          })
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
            });
          }
        );
      }

      

  });

export default router;