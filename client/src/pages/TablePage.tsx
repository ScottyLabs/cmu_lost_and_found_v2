import React from "react";
import Table from "../components/Table";

function Page2() {
  const items = [
    {
      id:1,
      dateFound: "11/12/20",
      timeFound: "11:12 am",
      object: "Phone",
      whereFound: "Tepper",
      description: "pink iPhone",
      category: "Phones",
      whereToRetrieve: "gates",
      image: "https://i.pcmag.com/imagery/reviews/03xdTO0Ka4H4KvEgtSPg4c2-12.1569479325.fit_lpad.size_357x209.jpg",
      imagePermission: false,
      claimStatus: "available",
    },
    {
      id:2,
      dateFound: "12/12/20",
      timeFound: "12:12 am",
      object: "Cat",
      whereFound: "Tepper",
      description: "pink iPhone",
      category: "Phones",
      whereToRetrieve: "gates",
      image: "https://i.pcmag.com/imagery/reviews/03xdTO0Ka4H4KvEgtSPg4c2-12.1569479325.fit_lpad.size_357x209.jpg",
      imagePermission: false,
      claimStatus: "available",
    },
  ];
  return (
    <>
      <div className="title">Lost and Found Inventory</div>
      <Table items={items}></Table>
    </>
  );
}

export default Page2;
