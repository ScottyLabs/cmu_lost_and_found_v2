import React from "react";
import { Link } from "react-router-dom"; 
import { Grid, Button } from "semantic-ui-react";
import "./Home.css";
import "semantic-ui-css/semantic.min.css";

function Home() {
  document.title = "CMU Lost and Found";
  return (
    <Grid>
      <main>
        <h1 id="title">Welcome to the<br></br>CMU Lost and Found</h1>
        <img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img>
        <br></br>
        <br></br>
        <Link to = "/AdminLogin"><Button>Admin Login</Button></Link>
        <Link to = "/Items"><Button>View Items</Button></Link>
      </main>
    </Grid>
  );
};

export default Home;