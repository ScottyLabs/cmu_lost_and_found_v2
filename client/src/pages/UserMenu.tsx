import { Grid } from "semantic-ui-react";
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
    fetchUsers();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3} id="side">
          <div id="sidemenu">
            <Link to="/"><img id="logo" src="/dog-logo.png" alt="CMU Lost and Found Logo"></img></Link>
            <br></br>
            <br></br>
            <AdminMenu activeTab="user menu"></AdminMenu>
          </div>
        </Grid.Column>
        <Grid.Column width={13}>
          <main>
            <h1 id="title">Users</h1>
            <div id="admin-filter-bar">
              <FilterBar></FilterBar>
              <AddUser fetchUsers = {fetchUsers}></AddUser>
            </div>
            <div id="table">
              <UserTable users={users} isOwner={true} fetchUsers={fetchUsers}></UserTable>
            </div>
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

};

export default UserMenu;