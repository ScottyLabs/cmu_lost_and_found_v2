import axios from "axios";
import React, { useState } from "react";
import { Button, Grid, Modal, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

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

let locations = [
  "Gates Hillman 6203",
  `University Center Information Desk`,
  `Residence on Fifth Front Desk`,
  `Morewood Front Desk`,
  `Donner Front Desk`,
];

const listItems = locations.map((d) => (
  <li className="location" key={d}>
    {d}
  </li>
));

export const foundItemMessage = (<>
  <p>
    If you find a lost item, please take it to one of the following
    locations:
  </p>
  <ul className="list">{listItems}</ul>
  <p>
    If you have any inquiries, please send an email to{" "}
    <a href="mailto:lostfound@cs.cmu.edu">lostfound@cs.cmu.edu</a>.
  </p>
</>);



export const lostItemMessage = (<>
  <p>
    If you lost an item and would like to report it, please visit this <a href="https://forms.gle/recPKrhJ3Ykhina3A"> site</a>.         
  
  </p>
  
</>);

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
