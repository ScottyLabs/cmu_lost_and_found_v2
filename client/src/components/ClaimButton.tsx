import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";

// Admin-side claim button that sets backend claim status to claimed
export default function ClaimButton(props: {
  id: string;
  fetchItems: Function
}) {
  return (
    <Button
      onClick={() => {
        axios
          .post(`http://localhost:3080/api/items/updateStatus`, { id: props.id, status: "claimed" })
          .then(
            (res) => {
              console.log("Claimed!");
              console.log(res);
              props.fetchItems();
            },
            (error) => {
              console.error(error);
            }
          );
      }}
    >
      Claim
    </Button>
  );
}
