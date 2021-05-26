import { Model, Query, Schema, Document, model } from "mongoose";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
// jsonwebtoken secret for authentication purposes
const JWT_SECRET = process.env.JWT_SECRET;
// time for access token to expire in milliseconds
const TIME_TO_EXPIRE = 3600000;

export interface IUser extends Document {
  username: string,
  password: string,
  isAdmin: boolean,
  checkPassword: (password: string) => boolean
  generateAuthToken: () => string
}

export interface IUserModel extends Model<IUser> {
  generateHash: (password: string) => string;
  findOneByUsername: (username: string) => Query<IUser>;
  getByToken: (
    token: string,
    callback: (err: any, user: IUser) => void
  ) => void;
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

UserSchema.statics.generateHash = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if this password matches
UserSchema.methods.checkPassword = function(password: string) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({id: this._id.toString(), accessTime: Date.now()}, JWT_SECRET);
};

UserSchema.statics.findOneByUsername = function (username: string) {
  return this.findOne({
    username: username.toLowerCase(),
  });
};

/**
 * Get a single user using a signed token.
 * @param  {String}   token    User's authentication token.
 * @param  {Function} callback args(err, user)
 */
UserSchema.statics.getByToken = function(token: string, callback: (err: any, user: IUser) => void) {
  jwt.verify(
    token,
    JWT_SECRET,
    function(err: any, payload: any) {
      if (!payload) {
        return callback("No token present. Did you forget to pass in the token with the API call?", null);
      }
      if (!payload.id || !payload.accessTime) {
        return callback("Bad token", null);
      }
      let id: string = payload.id;
      let accessTime: number = payload.accessTime;
      if (err) {
        return callback(err, null);
      }
      if (Date.now() > accessTime + TIME_TO_EXPIRE) {
        return callback("Token has expired. Please login again.", null);
      }
      this.findOne({ _id: id }, callback);
    }.bind(this)
  );
};


const User: IUserModel = model<IUser, IUserModel>("User", UserSchema, "users");

export default User;
