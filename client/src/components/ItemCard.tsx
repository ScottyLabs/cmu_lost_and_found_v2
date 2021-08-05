import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Item } from "../interface/item";
import "./ItemCard.css";

const ItemCard = (props: {
  item: Item,
}) => {
  let date = new Date(props.item.dateFound).toISOString().substring(0, 10).split("-");
  let dateFormatted = date[1] + "/" + date[2] + "/" + date[0];
  let [h, m] = props.item.timeFound.split(":");
  let timeFormatted = (parseInt(h) % 12) + (parseInt(h) % 12 === 0 ? 12 : 0) + ":" + m + " " + (parseInt(h) >= 12 ? "PM" : "AM");

  return (
    <div className="card-wrapper">
      <Card className="item-card" style={{height: "425px"}}>
        <Image style={{height: "200px"}} src={props.item.image ? props.item.image : "default_image.png"} ui={false} loading="lazy" />
        <Card.Content>
          <Card.Header>
            {props.item.name} 
          </Card.Header>
          <Card.Meta>
            <span className="date">
              Found on {dateFormatted}, {timeFormatted}
            </span>
          </Card.Meta>
          <Card.Description>
            {props.item.description}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <b>Found:</b> {props.item.whereFound} <br/>
          <b>Retrieve from&nbsp;</b>
          {props.item.whereToRetrieve}
        </Card.Content>
      </Card>
    </div>
  );
}

export default ItemCard;