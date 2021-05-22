import React, { useState, useEffect } from "react";
import { Grid, Rail } from "semantic-ui-react";
import {Link} from "react-router-dom";
import "./Admin.css";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

function Settings() {
  document.title = "CMU Lost and Found";
  const [items, setItems] = useState([]);

  const fetchItems = () => {
    axios.get(`/api/items/all`).then(
      (res) => {
        console.log(res);
        setItems(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Grid>
      <Grid.Row>
        {/* <Grid.Column width={3} id="side">
          <div>
              <Link to="/">
                <img
                  id="logo"
                  src="/dog-logo.png"
                  alt="CMU Lost and Found Logo"
                ></img>
              </Link>
            <br></br>
            <br></br>
            <AdminMenu activeTab="settings"></AdminMenu>
          </div>
        </Grid.Column> */}
        <Grid.Column width={16}>
          <main>
            <div id="top">
              <Rail attached internal position='left'>
                <Link to="/"><img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img></Link>
              </Rail>
            </div>
            <h1 id="title">Settings</h1>
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Settings;