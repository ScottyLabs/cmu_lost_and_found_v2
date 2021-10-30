import { BuildingType } from "../enums/locationTypes";
import { Building } from "./building";

export interface Item {
  _id: string;
  dateFound: string; // Ex: 2020-03-11T05:00:00.000Z
  timeFound: string; // Ex: 13:30
  name: string;
  whereFound: string;
  description: string;
  whereToRetrieve: Building;
  building: BuildingType;
  image: string;
  imagePermission: boolean;
  status: string;
  approved: boolean;
<<<<<<< Updated upstream
  publicDisplay: boolean;
=======
  identification: string;
>>>>>>> Stashed changes
  notes: string;
  username: string;
}
