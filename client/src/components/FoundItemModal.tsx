import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, Modal, Form } from "semantic-ui-react";

function exampleReducer(dispatchState: any, action: any) {
  switch (action.type) {
  case "CONFIG_CLOSE_ON_DIMMER_CLICK":
    return { ...dispatchState, closeOnDimmerClick: action.value };
  case "CONFIG_CLOSE_ON_ESCAPE":
    return { ...dispatchState, closeOnEscape: action.value };
  case "OPEN_MODAL":
    return { ...dispatchState, open: true };
  case "CLOSE_MODAL":
    return { ...dispatchState, open: false };
  default:
    throw new Error();
  }
}

const locations = [
  "Gates Hillman 6203",
  "University Center Information Desk",
  "Residence on Fifth Front Desk",
  "Morewood Front Desk",
  "Donner Front Desk",
];

const listItems = locations.map((d) => (
  <li className="location" key={d}>
    {d}
  </li>
));

export const foundItemMessage = (
  <>
    {/* <p>
      If you find a lost item, please take it to one of the following locations:
    </p>
    <ul className="list">{listItems}</ul> */}
    <p>
      Please return it to the CUC Lost and Found.
      If you have any inquiries, please send an email to{" "}
      <a href="mailto:cucinfodesk@andrew.cmu.edu">cucinfodesk@andrew.cmu.edu</a>{" "}
      or call 412-268-2107.
    </p>
  </>
);

export const feedbackForm = (
  <>
    <p>
      To leave feedback, please fill out this {" "}
      <a href="https://forms.gle/QDnNyjdzUBnFUkno8" target="_blank" rel="noreferrer">form</a>. Thanks!
    </p>
  </>
);

export const lostItemMessage = (
  <>
    <p>
      If you lost an item, please check the items below first to see if your item is there. 
      Otherwise, you can send an email to <a href="mailto:lost-and-found@cmu.edu">lost-and-found@cmu.edu</a>.
      Note that we do not actively cross-reference reported lost items with current lost and found inventory.
      Instead, we use the information submitted in special cases should we need to identify an item. 
    </p>
  </>
);

function FoundItemModal(props: {
  id?: string;
  style?: any;
}) {
  const [dispatchState, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = dispatchState;

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Modal
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          open={open}
          onOpen={() => dispatch({ type: "OPEN_MODAL" })}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          trigger={<Button color="red" id={props.id} style={props.style}>Report Item</Button>}
        >
          <Modal.Header>Report Item</Modal.Header>
          <Modal.Content style={{margin: "auto", maxWidth: "100%", padding: "30px", fontSize: "18px"}}>
            {/* Need to stop modal from closing when enter key is pressed */}
            { foundItemMessage }
            <Button onClick={() => dispatch({ type: "CLOSE_MODAL" })} negative>
              OK
            </Button>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  );
}

export default FoundItemModal;
