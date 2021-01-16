import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
// import { Item } from "../interface/item";

// Admin-side claim button that sets backend claim status to claimed
export default function ClaimButton(props: any) {
  let claimed = "claimed";
  return (
    <Button
      onClick={() => {
        axios
          .post(`api/items/updateStatus`, { id: props.id, status: claimed })
          .then(
            (res) => {
              console.log("Claimed!");
            },
            (error) => {
              console.log(error);
            }
          );
      }}
    >
      Claim
    </Button>
  );
}
