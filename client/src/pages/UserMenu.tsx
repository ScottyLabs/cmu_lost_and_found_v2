import { Button, Grid, Icon, Rail } from "semantic-ui-react";
import "./UserMenu.css";
import "semantic-ui-css/semantic.min.css";
import AdminMenu from "../components/AdminMenu";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import UserTable from "../components/UserTable";
import AddUser from "../components/AddUser";


function UserMenu() {
  // const users = [
  //   {
  //     username: "rwguo",
  //     password: "bleh",
  //     isOwner: false,
  //     isAdmin: true,
  //   },
  //   {
  //       username: "rwguo1",
  //       password: "bleh",
  //       isOwner: true,
  //       isAdmin: true,
  //     }
  // ];


  document.title = "Lost and Found User Permissions";
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get(`http://localhost:3080/api/users/all`)
      .then(
        (res) => {
          console.log("Retrieved users!");
          console.log(res);
          setUsers(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  useEffect(() => {
    console.log("Effect used!");
    fetchUsers();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <main>
            <Link to="/">
              <img
                src="/dog-logo.png"
                id="logo-mobile"
                alt="CMU Lost and Found Logo"
              ></img>
            </Link>
            <div id="settings">
              <Rail attached internal position="left" id="logo-desktop">
                <Link to="/">
                  <img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img>
                </Link>
              </Rail>
              <Link to="/admin">
                <Button icon>
                  <Icon name="setting" />
                </Button>
              </Link>
            </div>
            <h1 className="title">Carnegie Mellon University</h1>
            <h2 className="subtitle">Lost and Found Admin Panel - Users</h2>
            <div id="admin-filter-bar">
              <FilterBar></FilterBar>
              <AddUser fetchUsers={fetchUsers}></AddUser>
            </div>
            <div id="table">
              <UserTable
                users={users}
                isOwner={true}
                fetchUsers={fetchUsers}
              ></UserTable>
            </div>
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

};

export default UserMenu;