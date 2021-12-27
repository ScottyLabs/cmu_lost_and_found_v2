import React, { useState } from "react";
import { Form, Card } from "semantic-ui-react";
import { Item } from "../interface/item";
import "./CardWidget.css";
import ItemCard from "../components/ItemCard"


const CardWidget = (props: {
  items: Array<Item>;
  isAdmin: boolean;
  isArchived: boolean;
  fetchItems: Function;
}) => {
  const [displayArchived, setDisplayArchived] = useState(false);

  const updateDisplayArchived = (evt: any, data: any) => {
    setDisplayArchived(data.checked);
  };

  return (
    <Form>
      {props.isAdmin ? (
        <Form.Checkbox
          label="Show Archived Items"
          onClick={updateDisplayArchived}
        />
      ) : null}

      <Card.Group>
          {props.items
            .filter((item) => {
              return (
                (item.status === "available" && item.approved && item.publicDisplay) ||
                (props.isAdmin && displayArchived)
              );
            })
            .map((item: Item) => { 
              return (
                <ItemCard key={item._id} item={item}></ItemCard>
              );
            })
          }
      </Card.Group>
    </Form>
  )
}

export default CardWidget;