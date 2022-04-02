import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import User, { IUser } from "../models/User";
import * as jwt from "jsonwebtoken";

export default class UserController {
  /**
   * Login a user given an username and password.
   * @param  {String}   username    Username address
   * @param  {String}   password Password
   * @param  {Function} callback args(err, token, user)
   */
  public static loginWithPassword(
    username: string,
    password: string,
    callback: (err: string, token: string, user: any) => any
  ) {
    if (!password || password.length === 0) {
      return callback("Please enter a password", null, null);
    }

    User.findOneByUsername(username).exec(function (err: string, user: IUser) {
      if (err) {
        return callback(err, null, null);
      }
      if (!user) {
        return callback("We couldn't find you!", null, null);
      }
      if (!user.checkPassword(password)) {
        return callback("That's not the right password.", null, null);
      }
      let token = user.generateAuthToken();
      let u = user.toJSON();
      delete u.password;
      return callback(null, token, u);
    });
  }

  public static loginWithToken(
    token: string,
    callback: (err: any, token: string, user: IUser) => void
  ) {
    User.getByToken(token, (err: any, user: IUser) => {
      if (err) {
        return callback(err, null, null);
      } else if (!user) {
        return callback(null, token, null);
      } else {
        return callback(err, token, user);
      }
    });
  }

  public static createUser(
    username: string,
    permissions: string[],
    notif: boolean,
    callback: (err: string, user: IUser) => void
  ) {
    username = username.toLowerCase();

    // Check that there isn't a user with this username already.
    let u = new User();
    u.username = username;
    u.permissions = permissions;
    u.notif = notif;
    u.save(function (err: any, user: IUser) {
      if (err) {
        // Duplicate key error codes
        if (
          err.name === "MongoError" &&
          (err.code === 11000 || err.code === 11001)
        ) {
          return callback("An account for this username already exists.", user);
        }
        return callback(err.toString(), user);
      } else {
        // success
        return callback(null, user);
      }
    });
  }

  public static getByToken(
    token: string,
    callback: (err: any, user: IUser) => void
  ) {
    User.getByToken(token, callback);
  }
}
