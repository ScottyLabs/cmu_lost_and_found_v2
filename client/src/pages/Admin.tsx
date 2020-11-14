import React, { useEffect } from "react";
import { Link } from "react-router-dom"; 
import { Grid, Button } from "semantic-ui-react";
import "./Home.css";
import 'semantic-ui-css/semantic.min.css'

function Admin() {
  document.title = "CMU Lost and Found"
  return (
    <Grid>
      <main>
        <h1 className="title">Admin Page</h1>
        <Link to = "/"><Button>Home</Button></Link>
      </main>
    </Grid>
  );
};

export default Admin;