import axios from "axios";
import React, {useState, useEffect} from "react";
import { Grid, Button, Icon, Rail} from "semantic-ui-react";
import { Link } from "react-router-dom";
import TableWidget from "../components/TableWidget";
import FilterBar from "../components/FilterBar";
import SearchBar from '../components/SearchBar';
import { Item } from "../interface/item";
import "./TablePage.css";

function TablePage() {
  // const _items = [
  //   {
  //     id:'1',
  //     dateFound: "11/12/20",
  //     timeFound: "11:12 am",
  //     name: "Phone",
  //     whereFound: "Tepper",
  //     description: "pink iPhone",
  //     category: "Phones",
  //     whereToRetrieve: "gates",
  //     image: "https://i.pcmag.com/imagery/reviews/03xdTO0Ka4H4KvEgtSPg4c2-12.1569479325.fit_lpad.size_357x209.jpg",
  //     imagePermission: false,
  //     status: "available",
  //   },
  //   {
  //     id:'2',
  //     dateFound: "12/12/20",
  //     timeFound: "12:12 am",
  //     name: "Cat",
  //     whereFound: "Tepper",
  //     description: "pink iPhone",
  //     category: "Phones",
  //     whereToRetrieve: "gates",
  //     image: "https://i.pcmag.com/imagery/reviews/03xdTO0Ka4H4KvEgtSPg4c2-12.1569479325.fit_lpad.size_357x209.jpg",
  //     imagePermission: false,
  //     status: "available",
  //   },
  // ];
  const [items, setItems] = useState([]);

  //what is from the search
  const [input, setInput] = useState('');
  //unfiltered list
  const [itemListDefault, setItemListDefault] = useState([]);
  //filtered list
  const [itemList, setItemList] = useState([]);

  const fetchItems = () => {
    axios.get(`http://localhost:3080/api/items/all`).then(
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
    const filtered = itemListDefault.filter((item: Item) => {
     return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setInput(input);
    setItemList(filtered);
 }


  useEffect(() => {
    fetchItems();
  }, []);

  let description = `
  Hello, this is the Lost and Found page! `;
  let description2 = `If you find a lost item, please take it to one of the following locations:`; 
  let locations = ['Gates Hillman 6203', `Lost and Found desk in the University Center`, `Lost and Found desk in Residence on Fifth
  `, `Lost and Found desk in Morewood E-tower`, `Lost and Found desk in Donner`];
   
  let description3 = `To retrieve an object, go to the location listed next to the object on the table.  You will be required to identify any lost possessions. 
  All items must be picked up in person.
  If you have any inquiries, please send an email to lostfound@cs.cmu.edu. 
   `;
  const listItems = locations.map((d) => <div className = "location">{d}</div>);
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
            <div className="description">{description}</div>
            <div className="description">{description2}</div>
            {listItems}
            <div className="description">{description3}</div>
            <div id="center-admin-bar">
              <div id="admin-filter-bar">
                <FilterBar></FilterBar>
                {/* <SearchBar input={input} onChange={updateInput} /> */}
              </div>
            </div>

            <div id="table">
              <TableWidget
                items={itemList}
                isAdmin={false}
                isArchived={false}
                fetchItems={fetchItems}
              ></TableWidget>
            </div>
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default TablePage;
