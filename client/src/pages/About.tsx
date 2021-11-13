import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button, Icon, Rail } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./About.css";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";
import { User } from "../interface/user";
function About() {
    document.title = "CMU Lost and Found";
    const [user, setUser] = useState<User | null>(null);
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
    const history = useHistory();
    useEffect(() => {
    if (localStorage.getItem("lnf_token") == null) {
        console.log("not logged in");
        history.push("/login");
        return;
    }
    getCurrentUser();
    }, []);
    return user && (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
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
              <LogoutButton />
              {user.permissions?.length > 0 ? (
                <Link to="/admin">
                  <Button icon color="teal" labelPosition="left">
                    <Icon name="key" />
                    Admin Panel
                  </Button>
                </Link>
              ) : null}
              <Link to="/policies">
                <Button color="purple" icon labelPosition="left">
                <Icon name="check square outline" />
                  Policies
                  </Button>
              </Link>
              <Link to="/">
                <Button color="red" icon labelPosition="left" onClick={() => history.push("/")}>
                  <Icon name="list" />
                  Homepage
                </Button>
              </Link>
            </div>
            <h1 className="title">Carnegie Mellon University</h1>
            <h2 className="subtitle">Lost and Found - About</h2>
            <h3>About this Website:</h3>
            <div className="text">
              <p>
                  This website displays information about 
                  lost items registered with all the lost and found centers on 
                  campus. Users can browse through items and get information about 
                  where and when it was found, and where they can retrieve it.
              </p>
            </div>
            <h3>Mission Statement:</h3>
            <p className="text">
                There are many lost and found centers scattered throughout campus. 
                As there is little communication between these centers, students 
                often have to visit multiple locations to find their lost item. 
                This website seeks to fix this problem by providing a digital interface 
                that compiles all the lost items on campus in one location.
            </p>
            <h3>Contributors:</h3>
            <ul className="text">
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
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
export default About;
