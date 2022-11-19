/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form, Modal, Message } from "semantic-ui-react";

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

  const [archiveDays, setArchiveDays] = useState("");
  const [formError, setFormError] = useState("");

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNaN(Number(archiveDays))) {
      setFormError("Input not a number");
    } else if (Number(archiveDays) < 0) {
      setFormError("Input is negative");
    } else {
      axios
        .post("/api/items/archiveByDays", {
          token: localStorage.getItem("lnf_token"),
          days: parseInt(archiveDays),
          unavailable: true,
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
      setArchiveDays("");
      setFormError("");
    }
  };

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
      <Modal.Header>Bulk Archive Unavailable Items</Modal.Header>
      <Modal.Content
        style={{
          margin: "auto",
          maxWidth: "100%",
          padding: "20px 20px 10px 20px",
          fontSize: "18px",
        }}
      >
        <Form onSubmit={handleSubmit} error={formError !== ""}>
          <Form.Group inline>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                textAlign: "right",
                width: "100%",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 0, padding: 0 }}>
                Archive all unavailable items older than
              </p>
              <Form.Input
                label=""
                placeholder="0"
                width={2}
                name="archiveDays"
                value={archiveDays}
                onChange={(_e, { _, value }) => setArchiveDays(value)}
              />
              <p>days?</p>
            </div>
          </Form.Group>
          {formError !== "" ? <Message error content={formError} /> : null}
          <Form.Group inline id="modal-actions">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                textAlign: "right",
                width: "100%",
              }}
            >
              <Button
                type="button"
                onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                negative
              >
                Cancel
              </Button>
              <Button positive type="submit" style={{ marginLeft: "10px" }}>
                Confirm
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
