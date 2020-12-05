import React from "react";
import { Grid } from "semantic-ui-react";
import "./Items.css";
import "semantic-ui-css/semantic.min.css";

function Items() {
  document.title = "CMU Lost and Found";
  return (
    <Grid>
      <main>
        <h1 id="title">Item List</h1>
      </main>
    </Grid>
  );
};

export default Items;