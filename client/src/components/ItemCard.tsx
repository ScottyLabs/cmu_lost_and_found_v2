// TODO: #119 Replace any annotations with appropriate type
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Item } from "../interface/item";

import * as React from "react";
import { Card, Button, Modal } from "semantic-ui-react";
import "./ItemCard.css";

function exampleReducer(dispatchState: any, action: any) {
  switch (action.type) {
    case "CONFIG_CLOSE_ON_DIMMER_CLICK":
      return { ...dispatchState, closeOnDimmerClick: action.value };
    case "CONFI_CLOSE_ON_ESCAPE":
      return { ...dispatchState, closeOnEscape: action.value };
    case "OPEN_MODAL":
      return { ...dispatchState, open: true };
    case "CLOSE_MODAL":
      return { ...dispatchState, open: false };
    default:
      throw new Error();
  }
}

const ItemCard = (props: { item: Item }) => {
  const date = new Date(props.item.dateFound)
    .toISOString()
    .substring(0, 10)
    .split("-");
  const dateFormatted = date[1] + "/" + date[2] + "/" + date[0];
  const [h, m] = props.item.timeFound.split(":");
  const timeFormatted =
    (parseInt(h) % 12) +
    (parseInt(h) % 12 === 0 ? 12 : 0) +
    ":" +
    m +
    " " +
    (parseInt(h) >= 12 ? "PM" : "AM");

  const [dispatchState, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: true,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = dispatchState;

  return (
    <div className="card-wrapper">
      <Card className="item-card">
        <Card.Content className="top-content">
          {props.item.image?.length > 0 ? (
            <Modal
              closeOnEscape={closeOnEscape}
              closeOnDimmerClick={closeOnDimmerClick}
              open={open}
              onOpen={() => dispatch({ type: "OPEN_MODAL" })}
              onClose={() => dispatch({ type: "CLOSE_MODAL" })}
              trigger={
                <Button className="ui gray mini circular icon button show-image">
                  <i className="image outline large icon"></i>
                </Button>
              }
            >
              <Modal.Header>{props.item.name}</Modal.Header>
              <Modal.Content
                style={{
                  margin: "auto",
                  maxWidth: "100%",
                  padding: "30px",
                  fontSize: "18px",
                }}
              >
                {/* Need to stop modal from closing when enter key is pressed */}
                <img className="card-img" src={props.item.image}></img>
                <Button
                  className="image-button"
                  onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                  negative
                >
                  Close
                </Button>
              </Modal.Content>
            </Modal>
          ) : null}
          <Card.Header>{props.item.name}</Card.Header>
          <Card.Meta>
            <span className="date">
              Found on {dateFormatted}, {timeFormatted}
            </span>
          </Card.Meta>
          <Card.Description>
            {props.item.description}
            <br></br>
          </Card.Description>
        </Card.Content>
        <Card.Content className="bottom-content">
          <b>Found: </b>
          {props.item.whereFound} <br />
          <b>Retrieve From: </b>
          {props.item.whereToRetrieve.retrieveLocation}
        </Card.Content>
      </Card>
    </div>
  );
};

export default ItemCard;
