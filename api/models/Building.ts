import { Schema, Document, model } from "mongoose";

export interface IBuilding extends Document {
  name: string;
  retrieveLocation: string;
}

const BuildingSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  retrieveLocation: {
    type: String,
    default: "",
  },
});

const Building = model<IBuilding>("Building", BuildingSchema, "buildings");

export default Building;
