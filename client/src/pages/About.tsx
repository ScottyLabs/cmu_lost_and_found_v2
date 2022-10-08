import Header from "../components/Header";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import { User } from "../interface/user";

import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import "./About.css";
import "semantic-ui-css/semantic.min.css";

function About() {
  document.title = "CMU Lost and Found";
  const [user, setUser] = useState<User | null>(null);
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
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("lnf_token") == null) {
      console.log("not logged in");
      history.push("/login");
      return;
    }
    getCurrentUser();
  }, []);

  const isAllAdmin =
    user?.permissions.includes(`${BuildingType.ALL}:${PermissionType.ADMIN}`) ??
    false;

  return (
    user && (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header
              page={"/about"}
              isAdmin={user.permissions?.length > 0}
              isAllAdmin={isAllAdmin}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <main>
              <div id="policy">
                <div id="description">
                  <h2>About this Website</h2>
                  <p>
                    This website displays information about lost items
                    registered with all the lost and found centers on campus.
                    Users can browse through items and get information about
                    where and when it was found, and where they can retrieve it.
                  </p>
                  <h2>Mission Statement</h2>
                  <p>
                    There are many lost and found centers scattered throughout
                    campus. As there is little communication between these
                    centers, students often have to visit multiple locations to
                    find their lost item. This website seeks to fix this problem
                    by providing a digital interface that compiles all the lost
                    items on campus in one location.
                  </p>
                  <h2>Contributors</h2>
                  <ul id="contributors">
                    <li>Richard Guo (Project Lead)</li>
                    <li>Elizabeth Louie (Project Lead)</li>
                    <li>Jackie Yang (Project Lead)</li>
                    <li>Michael Crotty</li>
                    <li>Daniel Gunawan</li>
                    <li>Brian Lee</li>
                    <li>Victoria Lee</li>
                    <li>Cathy Li</li>
                    <li>Michelle Li</li>
                    <li>Yerim Song</li>
                    <li>Clara Wang</li>
                    <li>Rachel Wei</li>
                  </ul>
                </div>
              </div>
            </main>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  );
}
export default About;
