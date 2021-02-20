import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import {Link} from "react-router-dom";
import "./Admin.css";
import AdminMenu from "../components/AdminMenu";
import FilterBar from "../components/FilterBar";
import AddModal from "../components/AddModal";
import TableWidget from "../components/TableWidget";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

function Archived() {
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
            <AdminMenu activeTab="archived"></AdminMenu>
          </div>
        </Grid.Column> */}
        <Grid.Column width={16}>
          <main>
            <h1 id="title">Archived Items</h1>
            <div id="admin-filter-bar">
              <FilterBar></FilterBar>
              <AddModal fetchItems={fetchItems}></AddModal>
            </div>
            <div id="table">
              <TableWidget
                items={items}
                isAdmin={true}
                isArchived={true}
                fetchItems={fetchItems}
              ></TableWidget>
            </div>
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Archived;
