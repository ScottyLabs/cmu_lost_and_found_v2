import "./styles.css";

import { Item } from "../../interface/item";

import axios from "axios";
import { unparse } from "papaparse";
import * as React from "react";
import { Button } from "semantic-ui-react";

function DownloadDataButton() {
  function fetchItems(): Promise<Item[]> {
    return axios
      .post("/api/items/all", {
        token: window.localStorage.getItem("lnf_token"),
        onlyArchived: false,
      })
      .then((res) => {
        return res.data as Item[];
      });
  }

  function download() {
    fetchItems()
      .then((items) =>
        items.map((item) => {
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
        })
      )
      .then((items) => unparse(items, { header: true }))
      .then((csv) => new Blob([csv], { type: "text/csv" }))
      .then((file) => {
        const url = URL.createObjectURL(file);
        const element = document.createElement("a");
        element.download = "lostAndFoundData.csv";
        element.href = url;
        element.click();
      });
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
