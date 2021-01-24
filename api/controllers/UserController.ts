import User, { IUser } from "../models/User";

export default class UserController {

  /**
   * Login a user given an username and password.
   * @param  {String}   username    Username address
   * @param  {String}   password Password
   * @param  {Function} callback args(err, token, user)
   */
  public static loginWithPassword(username: string, password: string, callback: (err:string, token: string, user:any)=>any) {
    if (!password || password.length === 0) {
      return callback("Please enter a password", null, null);
    }
    
    User.findOneByUsername(username)
      .exec(function (err:string, user:IUser) {
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

  public static loginWithToken(token: string, callback: (err: any, token: string, user: IUser) => void) {
    User.getByToken(token, (err: any, user: IUser) => {
      if (err || !user) {
        return callback(err, null, null);
      }
      return callback(err, user.generateAuthToken(), user);
    });
  }

  /**
   * Determine whether or not a user can register.
   * @param  {String}   username    Username of the user
   * @param  {Function} callback args(err, true, false)
   * @return {[type]}            [description]
   */
  public static canRegister(username: string, password: string) {
    if (!password || password.length < 6) {
      return false;
    }
    return true;
  }

  public static createUser(username: string, password: string, isAdmin: boolean, isOwner: boolean, callback: (err: string, user:IUser) => void) {
    username = username.toLowerCase();

    // Check that there isn't a user with this username already.
    if (!this.canRegister(username, password)) {
      return callback("Can't register, password too short", null);
    }
    let u = new User();
    u.username = username;
    u.password = User.generateHash(password);
    u.isAdmin = isAdmin;
    u.isOwner = isOwner;
    u.save(function (err:any, user:IUser) {
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

  public static getByToken(token: string, callback: (err: any, user: IUser) => void) {
    User.getByToken(token, callback);
  };
}
