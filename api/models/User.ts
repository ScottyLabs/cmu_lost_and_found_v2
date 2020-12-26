import * as mongoose from "mongoose";
// import * as bcrypt from "bcrypt-nodejs";
// import * as jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema, "users");

export default User;
