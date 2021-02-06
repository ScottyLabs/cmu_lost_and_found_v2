import axios from "axios";
import React, {useState, useEffect} from "react";
import TableWidget from "../components/TableWidget";
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
  Hello, this is the Lost and Found page.
  If you find a lost item, please take it to either Gates Hillman 6203, or the Lost and Found desk in the University Center, whichever is closer to the lost item location. 
  Send email to lostfound@cs.cmu.edu. To retrieve an object, go to the location listed by the object.  You will be required to identify any
     lost possessions.  All items must be picked up in person.
   `;
  
  return (
    <>
      <div className="title">
        Carnegie Mellon University
      </div>
      <div className="title">
        Lost and Found Website
      </div>
      <div className="description">{description}</div>
      <SearchBar input={input} onChange={updateInput} />
      <TableWidget
        items={itemList}
        isAdmin={false}
        isArchived={false}
        fetchItems={fetchItems}
      ></TableWidget>
    </>
  );
}

export default TablePage;
