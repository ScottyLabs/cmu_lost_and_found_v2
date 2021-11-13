import React from "react";
import axios from "axios";
import { Label, Table } from "semantic-ui-react";
import { User } from "../interface/user";
import "./TableWidget.css";
import DeleteUser from "../components/DeleteUser";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import EditPermissions from "./EditPermissions";
import NotificationSwitch from "./NotificationSwitch";

const UserTable = (props: { users: Array<User>; fetchUsers: Function }) => {
  console.log("Creating table");
  return (
    <Table celled className="lf_table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Permissions</Table.HeaderCell>
          <Table.HeaderCell>Edit Permissions</Table.HeaderCell>
          <Table.HeaderCell>Notifications</Table.HeaderCell>
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
                {user.username}
              </Table.Cell>
              <Table.Cell>
                {user.permissions.map((perm, index) => {
                  const [building, action] = perm.split(":");
                  /* blue for users, yellow for admin with access to all, green for */
                  /* admin with access to specific buildings */
                  const color = action !== "ADMIN" ? "blue" : building !== "ALL" ? "green" : "yellow";
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
                <NotificationSwitch
                  username={user.username}
                  notif={user.notif}
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
