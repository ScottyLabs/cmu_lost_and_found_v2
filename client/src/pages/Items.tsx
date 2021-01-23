import React from "react";
import { Grid, Rail, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Items.css";
import UserMenu from "../components/UserMenu";
import FilterBar from "../components/FilterBar";
import "semantic-ui-css/semantic.min.css";

function Items() {
  document.title = "CMU Lost and Found";
  return (
    <Grid>
      <Grid.Row>
        {/* <Grid.Column width={3} id="side">
          <Link to="/"><img id="logo" src="/dog-logo.png" alt="CMU Lost and Found Logo"></img></Link>
          <br></br>
          <br></br>
          <UserMenu></UserMenu>
        </Grid.Column> */}
        <Grid.Column width={16}>
          <main>
            <div id="top">
              <Rail attached internal position='left'>
                <Link to="/"><img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img></Link>
              </Rail>
            </div>
            <h1 id="title">Available Items</h1>
            <div id="filter-bar">
              <FilterBar></FilterBar>  
            </div>
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Items;