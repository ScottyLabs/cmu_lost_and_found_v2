import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";

// Admin-side unclaim button that sets backend claim status to available
export default function UnclaimButton(props: any) {
  let available = "available";
  return (
    <Button
      onClick={() => {
        axios
          .post(`api/items/updateStatus`, { id: props.id, status: available })
          .then(
            (res) => {
              console.log("Unclaimed!");
            },
            (error) => {
              console.log(error);
            }
          );
      }}
    >
      Unclaim
    </Button>
  );
}
