import React, { useState } from "react";
import { Card, Image } from "semantic-ui-react";
import { Item } from "../interface/item";
import "./ItemCard.css";
import ReactCardFlip from "react-card-flip";
import ImageModal from "./ImageModal";

const ItemCard = (props: {
  item: Item,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleClick = (e: any) => {
    e.preventDefault();
    if (e.target.tagName === "I" || e.target.tagName === "BUTTON") {
      // don't flip card if clicked on image button
      return;
    }
    setIsFlipped(!isFlipped);
  }
  let date = new Date(props.item.dateFound).toISOString().substring(0, 10).split("-");
  let dateFormatted = date[1] + "/" + date[2] + "/" + date[0];
  let [h, m] = props.item.timeFound.split(":");
  let timeFormatted = (parseInt(h) % 12) + (parseInt(h) % 12 === 0 ? 12 : 0) + ":" + m + " " + (parseInt(h) >= 12 ? "PM" : "AM");

  return (
    <div className="card-wrapper">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" infinite>
        <Card className="item-card">
          {/* <Image src={props.item.image} wrapped ui={false} /> */}
          <Card.Content onClick={handleClick}>
            <Card.Header>
              {props.item.name} 
              <hr />
            </Card.Header>
            <Card.Meta>
              <span className="date">
                <b>Time Found: </b>
                {timeFormatted}
              </span>
              <br></br>
              <span className="date">
                <b>Date Found: </b> 
                {dateFormatted}
              </span>
            </Card.Meta>
            <Card.Description>
              <b>Description: </b> 
              {props.item.description}
            </Card.Description>
          </Card.Content>
        </Card>

        <Card className="item-card">
          {/* <Image src={props.item.image} wrapped ui={false} /> */}
          <Card.Content onClick={handleClick}>
            <div className="image-modal-wrapper">
              <ImageModal image={props.item.image}></ImageModal>
            </div>
            <Card.Description>
              <b>Where Found: </b>
              {props.item.whereFound}
            </Card.Description>
            <Card.Description>
              <b>Where to Retrieve: </b>
              {props.item.whereToRetrieve}
            </Card.Description>
          </Card.Content>
        </Card>
      </ReactCardFlip>
    </div>
  );
}

export default ItemCard;