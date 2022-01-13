import { Schema, Document, model } from "mongoose";
import { BuildingType } from "../enums/locationTypes";
import { IBuilding } from "./Building";

export interface IItem extends Document {
  dateFound: Date;
  timeFound: string;
  name: string;
  whereFound: string;
  description: string;
  category: string;
  whereToRetrieve: IBuilding;
  building: BuildingType;
  image: string;
  imagePermission: string;
  status: "available" | "destroyed" | "claimed";
  approved: boolean;
  notes: string;
  identification: string;
  username: string;
  modified: string[];
  approver: string;
}

const ItemSchema = new Schema(
  {
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
    building: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    imagePermission: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "destroyed", "claimed"],
      required: true,
    },
    approved: {
      type: Boolean,
      required: true,
    },
    publicDisplay: {
      type: Boolean,
      required: true,
    },
    identification: {
      type: String,
    },
    notes: {
      type: String,
    },
    /** Username of the admin user who last modified the item */
    username: {
      type: String,
    },
    /** Usernames of the admin users who last modified the item */
    modified: {
      type: [String],
    },
    /** Username of the admin user who approved the item */
    approver: {
      type: String,
    }
  },
  {
    toJSON: { virtuals: true },
  }
);

ItemSchema.virtual("whereToRetrieve", {
  ref: "Building",
  localField: "building",
  foreignField: "name",
  justOne: true,
});

const Item = model<IItem>("Item", ItemSchema, "items");

export default Item;
