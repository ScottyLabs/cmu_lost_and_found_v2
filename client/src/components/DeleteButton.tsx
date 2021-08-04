
import axios from "axios";
import React, { useState } from "react";
import { Button, Grid, Modal, Icon } from "semantic-ui-react";
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

export default function DeleteButton(props: {
  id: string;
  fetchItems: Function;
  disabled: boolean;
  style?: any;
}) {
  const [dispatchState, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = dispatchState;

  const history = useHistory();

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Modal
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          open={open}
          onOpen={() => dispatch({ type: "OPEN_MODAL" })}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          trigger={<Button disabled={props.disabled} icon circular size="tiny" type="button" floated="left" style={{backgroundColor: "#990F02"}}>
                    <Icon name="trash alternate outline" inverted size="large"></Icon>
                  </Button>}
        >
          <Modal.Header>Delete Item</Modal.Header>
          <Modal.Content style={{margin: "auto", maxWidth: "100%", padding: "20px 20px 50px 20px", fontSize: "18px"}}>
            {/* Need to stop modal from closing when enter key is pressed */}
            <p>
              Are you sure you wish to delete this item?
            </p>
            <Button onClick={() => {
              axios.post(`/api/items/delete`, { token: localStorage.getItem("lnf_token"), id: props.id }).then(
                (res) => {
                  console.log("Deleted!");
                  console.log(res);
                  props.fetchItems();
                },
                (error) => {
                  console.log(error);
                  alert("Unable to delete item");
                }
              );
              dispatch({ type: "CLOSE_MODAL" });
            }} positive floated="right">
              Yes
            </Button>
            <Button onClick={() => dispatch({ type: "CLOSE_MODAL" })} negative floated="right">
              Cancel
            </Button>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  );
}
