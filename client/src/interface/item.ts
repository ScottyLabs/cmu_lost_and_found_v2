import { BuildingType } from "../enums/locationTypes";
import { Building } from "./building";

export interface Item {
  _id: string;
  dateFound: string; // Ex: 2020-03-11T05:00:00.000Z
  dateReturned: string;
  timeFound: string; // Ex: 13:30
  name: string;
  whereFound: string;
  description: string;
  value: string;
  identifiable: boolean;
  whereToRetrieve: Building;
  building: BuildingType;
  image: string;
  imagePermission: boolean;
  status: string;
  approved: boolean;
  publicDisplay: boolean;
  archived: boolean;
  identification: string;
  notes: string;
  username: string;
  modified: string[];
  approver: string;
  returner: string;
  archiver: string;
}
