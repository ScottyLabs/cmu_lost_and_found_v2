import { BuildingType } from "../enums/locationTypes";
import { IBuilding } from "./Building";

import { Schema, Document, model } from "mongoose";

export interface IItem extends Document {
  dateFound: Date;
  dateReturned: Date;
  dateArchived: Date;
  timeFound: string;
  name: string;
  whereFound: string;
  description: string;
  value: "general" | "high value";
  identifiable: boolean;
  category: string;
  whereToRetrieve: IBuilding;
  building: BuildingType;
  image: string;
  imagePermission: string;
  status: "available" | "destroyed" | "claimed";
  approved: boolean;
  publicDisplay: boolean;
  archived: boolean;
  notes: string;
  identification: string;
  ownerNotified: string;
  itemLocation: string;
  username: string;
  modified: string[];
  approver: string;
  returner: string;
  archiver: string;
}

const ItemSchema = new Schema(
  {
    dateFound: {
      type: Date,
      required: true,
    },
    dateReturned: {
      type: Date,
    },
    dateArchived: {
      type: Date,
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
    value: {
      type: String,
      enum: ["general", "high value"],
      required: true,
    },
    identifiable: {
      type: Boolean,
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
    archived: {
      type: Boolean,
      required: true,
    },
    identification: {
      type: String,
    },
    ownerNotified: {
      type: String,
    },
    itemLocation: {
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
    },
    returner: {
      type: String,
    },
    archiver: {
      type: String,
    },
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
