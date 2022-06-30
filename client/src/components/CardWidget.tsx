import ItemCard from "../components/ItemCard";
import { Item } from "../interface/item";

import * as React from "react";
import { useState } from "react";
import { Form, Card } from "semantic-ui-react";

import "./CardWidget.css";

const CardWidget = (props: {
  items: Array<Item>;
  isAdmin: boolean;
  isArchived: boolean;
  // TODO: #132 Replace bad Function type with appropriate type
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchItems: Function;
}) => {
  const [displayArchived, setDisplayArchived] = useState(false);

  // TODO: #131 Replace any with proper type annotation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              (item.status === "available" &&
                item.approved &&
                item.publicDisplay) ||
              (props.isAdmin && displayArchived)
            );
          })
          .map((item: Item) => {
            return <ItemCard key={item._id} item={item}></ItemCard>;
          })}
      </Card.Group>
    </Form>
  );
};

export default CardWidget;
