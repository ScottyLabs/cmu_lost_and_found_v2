import React from "react";
import axios from "axios";
import { Icon, Button } from "semantic-ui-react";

// Admin-side unclaim button that sets backend claim status to available
export default function DeleteButton(props: {
  id: string;
  fetchItems: Function;
}) {
  const handleClick = () => {
    axios.post(`/api/items/delete`, { id: props.id }).then(
      (res) => {
        console.log("Deleted!");
        console.log(res);
        props.fetchItems();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Button icon circular color="red" size="tiny" onClick={handleClick}>
      <Icon name="trash alternate outline" inverted size="large"></Icon>
    </Button>
  );
}
