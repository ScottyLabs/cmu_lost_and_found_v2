import { Model, Query, Schema, Document, model } from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
const JWT_SECRET = "asdfwecvjoi3sdfoi";

export interface IUser extends Document {
  username: string,
  password: string,
  checkPassword: (password: string) => boolean
  generateAuthToken: () => string
}

export interface IUserModel extends Model<IUser> {
  generateHash: (password: string) => string,
  findOneByUsername: (username: string) => Query<IUser>
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
});

UserSchema.statics.generateHash = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if this password matches
UserSchema.methods.checkPassword = function(password: string) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(this._id.toString(), JWT_SECRET);
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
UserSchema.statics.getByToken = function(token: string, callback: Function) {
  jwt.verify(
    token,
    JWT_SECRET,
    function(err: any, id: any) {
      if (err) {
        return callback(err);
      }
      this.findOne({ _id: id }, callback);
    }.bind(this)
  );
};


const User: IUserModel = model<IUser, IUserModel>("User", UserSchema, "users");

export default User;
