import React from "react";
import axios from "axios";
import { Label, Table } from "semantic-ui-react";
import { User } from "../interface/user";
import "./TableWidget.css";
import DeleteUser from "../components/DeleteUser";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import EditPermissions from "./EditPermissions";

const UserTable = (props: { users: Array<User>; fetchUsers: Function }) => {
  console.log("Creating table");
  return (
    <Table celled className="lf_table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Permissions</Table.HeaderCell>
          <Table.HeaderCell>Edit Permissions</Table.HeaderCell>
          <Table.HeaderCell>Delete</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.users.map((user: User) => {
          const isAdmin = user.permissions.includes(
            `${String(BuildingType.ALL)}:${String(PermissionType.ADMIN)}`
          );
          return (
            <Table.Row key={user.username}>
              <Table.Cell>
                {user.username}{" "}
                {isAdmin && (
                  <Label horizontal color="yellow">
                    Admin
                  </Label>
                )}
              </Table.Cell>
              <Table.Cell>
                {user.permissions.map((perm, index) => {
                  const [building, action] = perm.split(":");
                  const color =
                    action === "ADMIN"
                      ? "yellow"
                      : action === "CREATE"
                      ? "green"
                      : action === "UPDATE"
                      ? "blue"
                      : "red";
                  return (
                    <Label color={color} image>
                      {building}
                      <Label.Detail>{action}</Label.Detail>
                    </Label>
                  );
                })}
              </Table.Cell>
              <Table.Cell>
                <EditPermissions
                  user={user}
                  fetchUsers={props.fetchUsers}
                />
              </Table.Cell>
              <Table.Cell>
                <DeleteUser
                  username={user.username}
                  fetchUsers={props.fetchUsers}
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default UserTable;
