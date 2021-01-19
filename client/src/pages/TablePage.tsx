import axios from "axios";
import React, {useState} from "react";
import TableWidget from "../components/TableWidget";

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

  const fetchItems = () => {
    axios.get(`http://localhost:3080/api/items/all`).then(
      (res) => {
        console.log(res);
        setItems(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <>
      <div className="title">Lost and Found Inventory</div>
      <TableWidget items={items} isAdmin={false} isArchived={false} fetchItems={fetchItems}></TableWidget>
    </>
  );
}

export default TablePage;