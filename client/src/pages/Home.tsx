import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";
import "./Home.css";
import "semantic-ui-css/semantic.min.css";
import FoundItemModal from "../components/FoundItemModal";
import Footer from "../components/Footer";

function Home() {
  document.title = "CMU Lost and Found";
  return (
    <Grid>
      <main id="home">
        <h1 id="title">
          Welcome to the<br></br>CMU Lost and Found
        </h1>
        <img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img>
        <br></br>
        <br></br>
        <br></br>
        <div className="buttons">
          <Link to="/items">
            <Button style={{ width: "125px" }}>View Items</Button>
          </Link>
          <FoundItemModal
            style={{ padding: "11px 11px", width: "125px" }}
          ></FoundItemModal>
        </div>
      </main>
      <Footer></Footer>
    </Grid>
  );
};

export default Home;