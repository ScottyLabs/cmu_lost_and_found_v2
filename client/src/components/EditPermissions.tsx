import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Grid, Icon, Label, Modal } from "semantic-ui-react";
import { User } from "../interface/user";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import { useHistory } from "react-router";

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

const buildings = Object.keys(BuildingType)
  .map((key) => ({
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

export default function EditPermissions(props: {
  user: User;
  fetchUsers: Function;
}) {
  const history = useHistory();
  const [permissions, setPermissions] = useState<string[]>(
    props.user.permissions
  );
  const [building, setBuilding] = useState<string>("");
  const [action, setAction] = useState<string>("");
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
          trigger={
            <Button icon circular color="blue" size="tiny">
              <Icon name="edit outline" inverted size="large"></Icon>
            </Button>
          }
        >
          <Modal.Header>Edit Permissions</Modal.Header>
          <Modal.Content>
            {/* Need to stop modal from closing when enter key is pressed */}
            <Form
              onSubmit={() => {
                setPermissions([...permissions, `${building}:${action}`]);
                setBuilding("");
                setAction("");
              }}
            >
              <h3>Permissions</h3>
              {permissions.map((perm, index) => {
                const [building, action] = perm.split(":");
                const color =
                  action === "ADMIN"
                    ? "yellow"
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
                <Form.Button>Add Permission</Form.Button>
              </Form.Group>
            </Form>
            <h3>Submit Changes</h3>
            <Button
              color="red"
              onClick={() => dispatch({ type: "CLOSE_MODAL" })}
            >
              Cancel
            </Button>
            <Button
              color="blue"
              onClick={() => {
                axios
                  .post("/api/accounts/updatePerm", {
                    token: localStorage.getItem("lnf_token"),
                    username: props.user.username,
                    perm: permissions,
                  })
                  .then(
                    (res) => {
                      console.log("Edited permissions!");
                      console.log(res);
                      props.fetchUsers();
                      dispatch({ type: "CLOSE_MODAL" });
                    },
                    (error) => {
                      console.log(error);
                      alert("Unable to edit permissions");
                      if (error?.response?.status === 401) {
                        window.localStorage.removeItem("lnf_token");
                        history.push("/login");
                      }
                      dispatch({ type: "CLOSE_MODAL" });
                    }
                  );
              }}
            >
              Submit
            </Button>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  );
}
