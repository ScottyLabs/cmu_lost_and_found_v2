import axios from "axios";
import * as React from "react";
import { useHistory } from "react-router";
import { Button } from "semantic-ui-react";

export default function BulkArchiveButton(props: {
  // TODO: #128 Replace Function type with appropriate type
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchItems: Function;
}) {
  const history = useHistory();
  return (
    <Button
      color="red"
      style={{ height: "47px", width: "110px", margin: "0px", marginRight:"10px" }}
      onClick={() => {
        axios
          .post("/api/items/archiveByDays", {
            token: localStorage.getItem("lnf_token"),
            days: 90,
          })
          .then(
            (res) => {
              console.log("Bulk archived!");
              console.log(res);
              props.fetchItems();
            },
            (error) => {
              console.log(error);
              if (error?.response?.status === 401) {
                window.localStorage.removeItem("lnf_token");
                history.push("/login");
              }
            }
          );
      }}
    >
      Bulk Archive
    </Button>
  );
}
