/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import * as React from "react";
import { useHistory } from "react-router";
import { Button, Modal } from "semantic-ui-react";

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

export default function BulkArchiveButton(props: { fetchItems: () => void }) {
  const [dispatchState, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = dispatchState;

  const history = useHistory();

  return (
    <Modal
      closeOnEscape={closeOnEscape}
      closeOnDimmerClick={closeOnDimmerClick}
      open={open}
      onOpen={() => dispatch({ type: "OPEN_MODAL" })}
      onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      trigger={
        <Button
          color="red"
          style={{
            height: "47px",
            width: "110px",
            margin: "0px",
            marginLeft: "10px",
          }}
        >
          Bulk Archive
        </Button>
      }
    >
      <Modal.Header>Bulk Archive</Modal.Header>
      <Modal.Content
        style={{
          margin: "auto",
          maxWidth: "100%",
          padding: "20px 20px 50px 20px",
          fontSize: "18px",
        }}
      >
        <p>Are you sure you wish to archive all items older than 90 days?</p>
        <Button
          onClick={() => {
            axios
              .post("/api/items/archiveByDays", {
                token: localStorage.getItem("lnf_token"),
                days: 90,
              })
              .then(
                (res) => {
                  console.log("Bulk archived!");
                  console.log(res);
                  props.fetchItems();
                },
                (error) => {
                  console.log(error);
                  if (error?.response?.status === 401) {
                    window.localStorage.removeItem("lnf_token");
                    history.push("/login");
                  }
                }
              );
            dispatch({ type: "CLOSE_MODAL" });
          }}
          positive
          floated="right"
        >
          Yes
        </Button>
        <Button
          onClick={() => dispatch({ type: "CLOSE_MODAL" })}
          negative
          floated="right"
        >
          Cancel
        </Button>
      </Modal.Content>
    </Modal>
  );
}
