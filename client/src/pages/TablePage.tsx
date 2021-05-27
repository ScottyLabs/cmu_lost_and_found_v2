import axios from "axios";
import React, {useState, useEffect} from "react";
import { Grid, Rail} from "semantic-ui-react";
import { Link } from "react-router-dom";
import TableWidget from "../components/TableWidget";
import SearchBar from '../components/SearchBar';
import { Item } from "../interface/item";
import CardWidget from "../components/CardWidget";
import ItemCard from "../components/ItemCard";

import "./TablePage.css";

function TablePage() {
  const [items, setItems] = useState([]);

  //what is from the search
  const [input, setInput] = useState('');
  //unfiltered list
  const [itemListDefault, setItemListDefault] = useState([]);
  //filtered list
  const [itemList, setItemList] = useState([]);

  const fetchItems = () => {
    axios.get(`/api/items/all`).then(
      (res) => {
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
  
 //modify items 
  const updateInput = async (input: string) => {
    let inputName = input.toLowerCase();
    const filtered = itemListDefault.filter((item: Item) => {
     return item.name.toLowerCase().includes(inputName) ||
      item.category.toLowerCase().includes(inputName) ||
      item.description.toLowerCase().includes(inputName)
    })
    setInput(input);
    setItemList(filtered);
 }


  useEffect(() => {
    fetchItems();
  }, []);
  


  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <main>
            <Link to="/">
              <img
                src="/dog-logo.png"
                id="logo-mobile"
                alt="CMU Lost and Found Logo"
              ></img>
            </Link>
            <div id="settings">
              <Rail attached internal position="left" id="logo-desktop">
                <Link to="/">
                  <img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img>
                </Link>
              </Rail>
              {/* <Link to="/Settings"><Button icon><Icon name='setting'/></Button></Link> */}
            </div>
            <h1 className="title">Carnegie Mellon University</h1>
            <h2 className="subtitle">Lost and Found Website</h2>
            <div id="description">
              <p>
                To retrieve an object, go to the location listed next to the
                object on the table. You will be required to identify any lost
                possessions. All items must be picked up in person. If you have
                any inquiries, please send an email to{" "}
                <a href="mailto:lostfound@cs.cmu.edu">lostfound@cs.cmu.edu</a>.
              </p>
            </div>
            <div id="admin-filter-bar">
              <SearchBar input={input} onChange={updateInput} />
            </div>

            <div id="cards-widget">
              <CardWidget
                items={itemList}
                isAdmin={false}
                isArchived={false}
                fetchItems={fetchItems}
              ></CardWidget>
            </div>
            <div id="table-widget">
              <TableWidget
                items={itemList}
                isUser={false}
                isAdmin={false}
                isArchived={false}
                fetchItems={fetchItems}
              ></TableWidget>
            </div>
            {/* <ItemCard name="bob"></ItemCard> */}
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default TablePage;
