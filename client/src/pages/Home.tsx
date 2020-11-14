import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import "./Home.css";

function Home() {
  return (
    <Grid>
      <div className="title">This is the Lost and Found Home Page</div>
      <Link to="/page2">Hi</Link>
    </Grid>
  );
};

export default Home;
