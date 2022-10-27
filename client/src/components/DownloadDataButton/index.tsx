import "./styles.css";

import { Item } from "../../interface/item";

import { unparse } from "papaparse";
import * as React from "react";
import { Button } from "semantic-ui-react";

interface Props {
  fetchItems: () => void;
  items: Item[];
}

function DownloadDataButton({ fetchItems, items }: Props) {
  function download() {
    fetchItems();

    const itemArray = items.map((item) => {
      const keysToOmit = [
        "_id",
        "id",
        "imagePermission",
        "approved",
        "publicDisplay",
        "whereToRetrieve",
        "__v",
      ];
      return keysToOmit.reduce<Partial<Item>>((acc, current) => {
        const { [current as keyof Item]: _omitted, ...rest } = acc;
        return rest;
      }, item);
    });

    const csv = unparse(itemArray, { header: true });

    const file = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(file);
    const element = document.createElement("a");
    element.download = "lostAndFoundData.csv";
    element.href = url;
    element.click();
  }

  return (
    <Button
      color="black"
      style={{ height: "47px", width: "110px" }}
      onClick={download}
    >
      Download Data
    </Button>
  );
}

export default DownloadDataButton;
