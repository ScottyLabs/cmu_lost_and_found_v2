import AddUser from "../components/AddUser";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import "./Accounts.css";
import "semantic-ui-css/semantic.min.css";
import { User } from "../interface/user";

import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "semantic-ui-react";

function Accounts() {
  document.title = "Lost and Found User Permissions";
  //what is from the search
  const [input, setInput] = useState("");
  //unfiltered list
  const [userListDefault, setUserListDefault] = useState([]);
  //filtered list
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState<User | null>(null);
  const history = useHistory();

  const fetchUsers = () => {
    axios
      .post("/api/accounts/all", { token: localStorage.getItem("lnf_token") })
      .then(
        (res) => {
          console.log("Retrieved users!");
          console.log(res);
          //added
          setUserListDefault(res.data);
          setUserList(res.data);
        },
        (error) => {
          console.log(error);
          if (error?.response?.status === 401) {
            window.localStorage.removeItem("lnf_token");
            history.push("/login");
          } else if (error?.response?.status === 403) {
            history.push("/");
          }
        }
      );
  };

  const getCurrentUser = () => {
    axios
      .post("/api/accounts/currentUser", {
        token: window.localStorage.getItem("lnf_token"),
      })
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        } else {
          setUser({ username: "user", permissions: [], notif: false });
        }
      });
  };

  useEffect(() => {
    console.log("Effect used!");
    getCurrentUser();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (
      user &&
      !user?.permissions?.includes(
        `${BuildingType.ALL}:${PermissionType.ADMIN}`
      )
    ) {
      history.push("/");
    }
  }, [user]);

  //modify users
  const updateInput = async (input: string) => {
    const filtered = userListDefault.filter((user: User) => {
      return user.username.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setUserList(filtered);
  };

  const isAllAdmin =
    user?.permissions.includes(`${BuildingType.ALL}:${PermissionType.ADMIN}`) ??
    false;

  return (
    user && (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header
              page={"/accounts"}
              isAdmin={user.permissions?.length > 0}
              isAllAdmin={isAllAdmin}
            />
          </Grid.Column>
        </Grid.Row>
      <Grid.Row>
       <Grid.Column width={16}>
          <div id="add-user-mobile">
            <AddUser fetchUsers={fetchUsers}></AddUser>
          </div>
          <div id="admin-filter-bar">
            <SearchBar input={input} onChange={updateInput} placeholder={"Search..."}/>
            <div id="add-user-desktop">
                <AddUser fetchUsers={fetchUsers}></AddUser>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <main>
              <div id="table">
                <UserTable users={userList} fetchUsers={fetchUsers}></UserTable>
              </div>
            </main>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  );
}

export default Accounts;