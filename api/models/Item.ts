import * as mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  description: {
    type: String,
    required: true
  },
  dateFound: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['clothing', 'headphones', 'jewelry', 'keys', 'laptops', 'phones', 'students ids',
    'tablets','umbrellas', 'water bottles', 'other electronics', 'miscellaneous'],
    required: true
  },
  foundLoc: {
    type: String,
    required: true
  },
  retrievalLoc: {
    type: String,
    /* Need to add the other lost and found options */
    enum: ['CUC', 'Gates', 'other'],
    required: true
  },
  contactInfo: {
    email: String,
    phone: String
  },
  image: {
    type: String
  },
  imagepermission: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available'
  }
});

const Item = mongoose.model("Item", ItemSchema, "items");

export default Item; 