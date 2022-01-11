import { Model, Query, Schema, Document, model } from "mongoose";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import axios from "axios";
import { schedule } from "node-cron";
// jsonwebtoken secret for authentication purposes
let JWT_PUBKEY: string;
// time for access token to expire in milliseconds
const TIME_TO_EXPIRE = 3600000;

async function getLoginKey() {
  JWT_PUBKEY = (await axios.get("https://login.scottylabs.org/login/pubkey")).data;
}

if (!JWT_PUBKEY) {
  getLoginKey();
}

schedule("0 0 * * *", getLoginKey);

export interface IUser extends Document {
  username: string;
  password: string;
  isAdmin: boolean;
  permissions: string[];
  notif: boolean;
  checkPassword: (password: string) => boolean;
  generateAuthToken: () => string;
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
    unique: true,
  },
  password: {
    type: String,
  },
  notif: {
    type: Boolean,
  },
  permissions: [
    {
      type: String,
    },
  ],
});

UserSchema.statics.generateHash = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if this password matches
UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id.toString(), accessTime: Date.now() },
    JWT_PUBKEY
  );
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
UserSchema.statics.getByToken = function (
  token: string,
  callback: (err: any, user: IUser) => void
) {
  jwt.verify(
    token,
    JWT_PUBKEY,
    { algorithms: ["RS256"] },
    function (err: any, payload: any) {
      if (err) {
        return callback(err, null);
      }
      if (!payload) {
        return callback(
          "No token present. Did you forget to pass in the token with the API call?",
          null
        );
      }
      if (
        payload.applicationId !== process.env.LOGIN_API_ID ||
        !payload.email
      ) {
        return callback("Bad token", null);
      }
      const email: string = payload.email;
      this.findOne({ username: email }, callback);
    }.bind(this)
  );
};

const User: IUserModel = model<IUser, IUserModel>("User", UserSchema, "users");

export default User;
