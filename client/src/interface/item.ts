import { BuildingType } from "../enums/locationTypes";

export interface Item {
  _id: string;
  dateFound: string; // Ex: 2020-03-11T05:00:00.000Z
  timeFound: string; // Ex: 13:30
  name: string;
  whereFound: string;
  description: string;
  category: string;
  whereToRetrieve: string;
  building: BuildingType;
  image: string;
  imagePermission: boolean;
  status: string;
  approved: boolean;
}
