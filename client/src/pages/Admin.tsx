import React, {useState,useEffect} from "react";
import { Grid, Button, Icon, Rail} from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Admin.css";
import AdminMenu from "../components/AdminMenu";
import FilterBar from "../components/FilterBar";
import AddModal from "../components/AddModal";
import TableWidget from "../components/TableWidget";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { Item } from "../interface/item";
import SearchBar from "../components/SearchBar";

function Admin() {
  document.title = "CMU Lost and Found";

  // const _items = [
  //   {
  //     id: "1",
  //     dateFound: "11/12/20",
  //     timeFound: "11:12 am",
  //     name: "Phone",
  //     whereFound: "Tepper",
  //     description: "pink iPhone",
  //     category: "Phones",
  //     whereToRetrieve: "gates",
  //     image:
  //       "https://i.pcmag.com/imagery/reviews/03xdTO0Ka4H4KvEgtSPg4c2-12.1569479325.fit_lpad.size_357x209.jpg",
  //     imagePermission: false,
  //     status: "available",
  //   },
  //   {
  //     id: "2",
  //     dateFound: "12/12/20",
  //     timeFound: "12:12 am",
  //     name: "Cat",
  //     whereFound: "Tepper",
  //     description: "pink iPhone",
  //     category: "Phones",
  //     whereToRetrieve: "gates",
  //     image:
  //       "https://i.pcmag.com/imagery/reviews/03xdTO0Ka4H4KvEgtSPg4c2-12.1569479325.fit_lpad.size_357x209.jpg",
  //     imagePermission: false,
  //     status: "available",
  //   },
  // ];
  const [items, setItems] = useState([]);
  //what is from the search
  const [input, setInput] = useState("");
  //unfiltered list
  const [itemListDefault, setItemListDefault] = useState([]);
  //filtered list
  const [itemList, setItemList] = useState([]);

  const fetchItems = () => {
    axios.get(`http://localhost:3080/api/items/all`).then(
      (res) => {
        console.log("Claimed!");
        console.log(res);
        setItems(res.data);
        //added
        setItemListDefault(res.data);
        setItemList(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    fetchItems();
  }, []);

  //modify items
  const updateInput = async (input: string) => {
    const filtered = itemListDefault.filter((item: Item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setItemList(filtered);
  };

  return (
    <Grid>
      {/* <Grid.Row id="settings">
        <Grid.Column>
          <Rail attached internal position='right'>
            <Link to="/Settings"><Button>Settings</Button></Link>
          </Rail>
        </Grid.Column>
      </Grid.Row> */}
      <Grid.Row>
        {/* <Grid.Column width={3} id="side">
          <div>
           <Link to="/"><img id="logo" src="/dog-logo.png" alt="CMU Lost and Found Logo"></img></Link>
            <br></br>
            <br></br>
            <AdminMenu activeTab="admin"></AdminMenu>
          </div>
        </Grid.Column> */}
        <Grid.Column width={16}>
          <main>
            <Link to="/"><img src="/dog-logo.png" id="logo-mobile" alt="CMU Lost and Found Logo"></img></Link>
            <div id="settings">
              <Rail attached internal position='left' id="logo-desktop">
                <Link to="/"><img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img></Link>
              </Rail>
              <Link to="/Settings"><Button icon><Icon name='setting'/></Button></Link>
            </div>
            <h1 id="title">Available Items</h1>
            <div id="add-mobile">
              <AddModal fetchItems={fetchItems}></AddModal>
            </div>
            <div id="admin-filter-bar">
              <FilterBar></FilterBar>
              <SearchBar input={input} onChange={updateInput} />
              <AddModal fetchItems={fetchItems}></AddModal>
            </div>
            <div id="table">
              <TableWidget
                items={itemList}
                isAdmin={true}
                isArchived={false}
                fetchItems={fetchItems}
              ></TableWidget>
            </div>
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Admin;