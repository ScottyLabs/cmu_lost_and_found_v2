import ItemCard from "../components/ItemCard";
import { Item } from "../interface/item";

import * as React from "react";
import { useState } from "react";
import { Form, Card } from "semantic-ui-react";

import "./CardWidget.css";

const CardWidget = (props: {
  items: Array<Item>;
  // TODO: #132 Replace bad Function type with appropriate type
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchItems: Function;
}) => {
  return (
    <Card.Group>
      {props.items
        .filter((item) => {
          return (
            item.status === "available" && item.approved && item.publicDisplay
          );
        })
        .map((item: Item) => {
          return <ItemCard key={item._id} item={item}></ItemCard>;
        })}
    </Card.Group>
  );
};

export default CardWidget;
