import React, { useEffect } from "react";
import { Link } from "react-router-dom"; 
import { Grid, Button } from "semantic-ui-react";
import "./Home.css";
import 'semantic-ui-css/semantic.min.css'

function Home() {
  document.title = "CMU Lost and Found"
  return (
    <Grid>
      <main>
        <h1 className="title">Welcome to the<br></br>CMU Lost and Found</h1>
        <img src="/dog-logo.png" alt="CMU Lost and Found Logo" width="300"></img>
        <br></br>
        <br></br>
        <Link to = "/Admin"><Button>Admin Login</Button></Link>
      </main>
    </Grid>
  );
};

export default Home;