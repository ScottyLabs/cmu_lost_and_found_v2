import React from "react";
import axios from "axios";
import { Table } from "semantic-ui-react";
import { User } from "../interface/user";
import "./TableWidget.css";
import { Checkbox } from "semantic-ui-react";
import DeleteUser from "../components/DeleteUser";

const UserTable = (props: {
  users: Array<User>;
  fetchUsers: Function;
}) => {
  console.log("Creating table");
  return (
    <Table celled className="lf_table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Admin</Table.HeaderCell>
          <Table.HeaderCell>Delete</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.users.map((user: User) => {
          return (
            <Table.Row key={user.username}>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>
                <Checkbox
                  toggle
                  checked={user.isAdmin}
                  onChange={(
                    event: React.FormEvent<HTMLInputElement>,
                    data
                  ) => {
                    axios
                      .post(`/api/accounts/updatePerm`, {
                        token: localStorage.getItem("lnf_token"),
                        username: user.username,
                        perm: "isAdmin",
                        isChecked: data.checked,
                      })
                      .then(
                        (res) => {
                          console.log("Sent permission change request!");
                          console.log(res);
                          props.fetchUsers();
                        },
                        (error) => {
                          console.error(error);
                        }
                      );
                  }}
                ></Checkbox>
              </Table.Cell>
              <Table.Cell>
                <DeleteUser
                  username={user.username}
                  fetchUsers={props.fetchUsers}
                ></DeleteUser>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default UserTable;
