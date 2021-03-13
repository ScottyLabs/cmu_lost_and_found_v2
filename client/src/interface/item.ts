export interface Item {
  _id: string;
  dateFound: Date;
  timeFound: string;
  name: string;
  whereFound: string;
  description: string;
  category: string;
  whereToRetrieve: string;
  image: string;
  imagePermission: boolean;
  status: string;
}
