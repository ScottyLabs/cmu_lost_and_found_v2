import * as mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  dateFound: {
    type: Date,
    required: true,
  },
  timeFound: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  whereFound: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  whereToRetrieve: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  imagePermission: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["available", "destroyed", "claimed"],
    required: true
  },
  approved: {
    type: Boolean,
    required: true
  }
});

const Item = mongoose.model("Item", ItemSchema, "items");

export default Item; 