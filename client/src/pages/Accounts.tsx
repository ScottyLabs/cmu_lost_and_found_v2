import { Button, Grid, Icon, Rail } from "semantic-ui-react";
import "./Accounts.css";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { User } from "../interface/user";
import { Link } from "react-router-dom";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import AddUser from "../components/AddUser";
import LogoutButton from "../components/LogoutButton";
import { useHistory } from "react-router-dom";

function Accounts() {
  // const users = [
  //   {
  //     username: "rwguo",
  //     password: "bleh",
  //     isAdmin: true,
  //   },
  //   {
  //       username: "rwguo1",
  //       password: "bleh",
  //       isAdmin: true,
  //     }
  // ];

  document.title = "Lost and Found User Permissions";
  const [users, setUsers] = useState([]);
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
      .post(`/api/accounts/all`, { token: localStorage.getItem("lnf_token") })
      .then(
        (res) => {
          console.log("Retrieved users!");
          console.log(res);
          setUsers(res.data);
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
    axios.post('/api/accounts/currentUser', {
      token: window.localStorage.getItem("lnf_token")
    }).then(
      (res) => {
        if (res.data) {
          setUser(res.data);
        } else {
          setUser({ username: "user", permissions: [] });
        }
      }
    )
  };

  useEffect(() => {
    console.log("Effect used!");
    getCurrentUser();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (user && !user?.permissions?.includes("ALL:ADMIN")) {
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

  return user && (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <main>
            <Link to="/admin">
              <img
                src="/dog-logo.png"
                id="logo-mobile"
                alt="CMU Lost and Found Logo"
              ></img>
            </Link>
            <div id="settings">
              <Rail attached internal position="left" id="logo-desktop">
                <Link to="/admin">
                  <img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img>
                </Link>
              </Rail>
              <LogoutButton />
              <Link to="/admin">
                <Button size="large" color="teal" icon="arrow left"></Button>
              </Link>
            </div>
            <h1 className="title">Carnegie Mellon University</h1>
            <h2 className="subtitle">Lost and Found Admin Panel - Accounts</h2>
            <div id="add-user-mobile">
              <AddUser fetchUsers={fetchUsers}></AddUser>
            </div>
            <div id="admin-filter-bar">
              <SearchBar input={input} onChange={updateInput} />
              <div id="add-user-desktop">
                <AddUser fetchUsers={fetchUsers}></AddUser>
              </div>
            </div>
            <div id="table">
              <UserTable users={userList} fetchUsers={fetchUsers}></UserTable>
            </div>
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Accounts;
