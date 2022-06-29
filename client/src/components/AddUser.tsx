import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";

import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Grid, Modal, Form, Label, Icon } from "semantic-ui-react";
import "./AddUser.css";

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

function AddUser(props: { fetchUsers: Function }) {
  const history = useHistory();
  const buildings = Object.keys(BuildingType).map((key) => ({
    key,
    text: key,
    value: key,
  }));

  const actions = Object.keys(PermissionType)
    .filter((value) => value !== "ALL")
    .map((key) => ({
      key,
      text: key,
      value: key,
    }));
  const [dispatchState, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = dispatchState;

  const [username, setUsername] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);
  const [building, setBuilding] = useState("");
  const [action, setAction] = useState("");

  const alertText =
    "There are multiple overlapping permissions associated with this user. Do you still wish to proceed?";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let compare = -1;
    for (let i = 0; i < permissions.length; i++) {
      if (permissions[i].includes(`${BuildingType.ALL}:${PermissionType.ADMIN}`)) {
        if (compare == -1) compare = 2;
        else {
          const res = window.confirm(alertText);
          if (!res) return;
        }
      } else if (permissions[i].includes(PermissionType.ADMIN)) {
        if (compare == -1 || compare == 1) compare = 1;
        else {
          const res = window.confirm(alertText);
          if (!res) return;
        }
      } else {
        if (compare == -1 || compare == 0) compare = 0;
        else {
          const res = window.confirm(alertText);
          if (!res) return;
        }
      }
    }
    axios
      .post("/api/auth/create", {
        token: localStorage.getItem("lnf_token"),
        username: username,
        permissions: permissions,
        notif: false,
      })
      .then(
        (res) => {
          console.log("Added");
          console.log(res);
          props.fetchUsers();
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
    setUsername("");
    setPermissions([]);
    setBuilding("");
    setAction("");
  };

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Modal
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          open={open}
          onOpen={() => dispatch({ type: "OPEN_MODAL" })}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          trigger={
            <Button
              color="red"
              id="add-user"
              style={{ height: "47px", width: "110px", marginLeft: "2px" }}
            >
              Add User
            </Button>
          }
        >
          <Modal.Header>Add User</Modal.Header>
          <Modal.Content>
            {/* Need to stop modal from closing when enter key is pressed */}
            <Form onSubmit={handleSubmit}>
              <Form.Input
                required
                fluid
                label="Username (Andrew Email)"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <h3>Permissions</h3>
              {permissions.length === 0 && (
                <p>No permissions added yet for this user</p>
              )}
              {permissions.map((perm, index) => {
                const [building, action] = perm.split(":");
                const color =
                  action === PermissionType.ADMIN
                    ? building == BuildingType.ALL
                      ? "yellow"
                      : "green"
                    : "blue";
                return (
                  <Label
                    color={color}
                    image
                    as="a"
                    onClick={() => {
                      setPermissions(
                        permissions.filter((_value, idx) => idx !== index)
                      );
                    }}
                  >
                    {building}
                    <Label.Detail>
                      {action}
                      <Icon name="delete" />
                    </Label.Detail>
                  </Label>
                );
              })}
              <h3>Add Specific Permission</h3>
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  required
                  options={buildings}
                  placeholder="Building"
                  name="building"
                  value={building}
                  onChange={(_e, { value }) => {
                    setBuilding(String(value));
                  }}
                />
                <Form.Select
                  fluid
                  required
                  options={actions}
                  placeholder="Action"
                  name="action"
                  value={action}
                  onChange={(_e, { value }) => {
                    setAction(String(value));
                  }}
                />
                <Form.Button
                  type="button"
                  color="teal"
                  onClick={() => {
                    setPermissions([...permissions, `${building}:${action}`]);
                    setBuilding("");
                    setAction("");
                  }}
                >
                  Add Permission
                </Form.Button>
              </Form.Group>
              <Form.Group inline id="modal-actions">
                <Button
                  onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                  negative
                  type="button"
                >
                  Cancel
                </Button>
                {/* Need to close modal after validation of the form */}
                <Button positive type="submit">
                  Add
                </Button>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  );
}

export default AddUser;
