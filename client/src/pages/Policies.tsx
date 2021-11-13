import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Button, Icon, Rail } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";
import { User } from "../interface/user";

function Policies() {
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
              <img src="/dog-logo.png" id="logo-mobile" alt="CMU Lost and Found Logo"></img>
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
              <Link to="/about">
                <Button color="orange" icon labelPosition="left">
                <Icon name="info circle" />
                  About
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
            <h2 className="subtitle">Lost and Found - Policies</h2>
            <div id="about">
              <div id="description">
                <h2> General </h2>
                The Cohon University Center Information Desk maintains a lost and found for the campus. The following policy will be adhered to regarding items turned into the lost and found.
                All items turned in will be labeled with the date on which it was turned in. The items are stored in a closet behind the Information Desk.
                Items will be held in lost and found for no longer than 30 days.
                <ul>
                    <li> ID cards and credit cards will be shredded and discarded </li>
                    <li> Cell phones will be recycled </li>
                    <li> Any money turned in will be absorbed into the Jared L. Cohon University Center account </li>
                    <li> Personal items such as clothing and bags will be donated to charity </li>
                    <li> All other items that cannot be donated will be discarded </li>
                </ul>
                <h2> Valuable Items </h2>
                <ul>
                    <li> Any items deemed to be worth more than $50 will be recorded on a spreadsheet and locked in the safe, where it can be accessed only by the Cohon University Center staff. </li>
                    <li> These items can only be returned if a staff member is available to open the safe. </li>
                    <li> Patrons must present identification before these items will be returned, and may be asked for additional verification to confirm ownership. </li>
                </ul>
              </div>
            </div>
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
export default Policies;
    