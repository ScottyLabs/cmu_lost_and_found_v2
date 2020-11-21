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
  foundLoc: {
    type: String,
    required: true
  },
  retrievalLoc: {
    type: String,
    /* Need to add the lost and found options */
    enum: ['CUC', 'Gates', 'other'],
  },
  contactInfo: {
    email: String,
    phone: String
  },
  image: {
    img: String
  },
  status: {
    type: Boolean,
    default: false
  }
});

const Item = mongoose.model("Item", ItemSchema);

export default Item;