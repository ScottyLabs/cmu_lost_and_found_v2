import "./TableWidget.css";
import AddUser from "../components/AddUser";
import DeleteUser from "../components/DeleteUser";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import { User } from "../interface/user";
import EditPermissions from "./EditPermissions";
import NotificationSwitch from "./NotificationSwitch";

import * as React from "react";
import { Label, Table } from "semantic-ui-react";

// TODO: #110 Replace bad type Function with appropriate type
// eslint-disable-next-line @typescript-eslint/ban-types
const UserTable = (props: { users: Array<User>; fetchUsers: () => void }) => {
  console.log("Creating table");
  return (
    <div>
      <AddUser fetchUsers={props.fetchUsers}></AddUser>
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
            const isAdmin = user.permissions.some((perm) =>
              perm.endsWith(PermissionType.ADMIN)
            );
            return (
              <Table.Row key={user.username}>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>
                  {user.permissions.map((perm, _index) => {
                    const [building, action] = perm.split(":");
                    /* blue for users, yellow for admin with access to all, green for */
                    /* admin with access to specific buildings */
                    const color =
                      action !== PermissionType.ADMIN
                        ? "blue"
                        : building !== BuildingType.ALL
                        ? "green"
                        : "yellow";
                    return (
                      // TODO: #111 Fix missing React key prop
                      // eslint-disable-next-line react/jsx-key
                      <Label color={color} image>
                        {building}
                        <Label.Detail>{action}</Label.Detail>
                      </Label>
                    );
                  })}
                </Table.Cell>
                <Table.Cell>
                  <EditPermissions user={user} fetchUsers={props.fetchUsers} />
                </Table.Cell>
                <Table.Cell>
                  {isAdmin && (
                    <NotificationSwitch
                      username={user.username}
                      notif={user.notif}
                      fetchUsers={props.fetchUsers}
                    />
                  )}
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
    </div>
  );
};

export default UserTable;
