import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";
import AddItemButton from "../components/AddItemButton";
import "./Home.css";
import "semantic-ui-css/semantic.min.css";

function Home() {
  document.title = "CMU Lost and Found";
  return (

    <Grid>
      <main id="home">
        <h1 id="title">Welcome to the<br></br>CMU Lost and Found</h1>
        <img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img>
        <br></br>
        <br></br>
        <br></br>
        <div className={"buttons"}>
          <AddItemButton name={"Report Found Item"} fetchItems={() => null} isAdmin={false} button={"Report"}></AddItemButton>
          <Link to="/items"><Button>View Items</Button></Link>
        </div>
      </main>
    </Grid>
  );
};

export default Home;