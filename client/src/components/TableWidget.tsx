import React from "react";
import { Table } from "semantic-ui-react";
import { Item } from "../interface/item";
import "./TableWidget.css";
//import ViewIcon from "./ViewIcon";
import ImageModal from "./ImageModal";
import ClaimButton from "./ClaimButton";

const TableWidget = (props: {
  items: Array<Item>;
  permissions: boolean;
}) => {
  return (
    <Table celled className="lf_table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date Found</Table.HeaderCell>
          <Table.HeaderCell>Time Found</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Where Found</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell>Where to Retrieve</Table.HeaderCell>
          <Table.HeaderCell>Image</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.items.map((item: Item) => {
          return (
            <Table.Row key={item.id}>
              <Table.Cell>{item.dateFound}</Table.Cell>
              <Table.Cell>{item.timeFound}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.whereFound}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell>{item.whereToRetrieve}</Table.Cell>
              <Table.Cell>
                <ImageModal image={item.image}></ImageModal>
                {props.permissions ? (<ClaimButton></ClaimButton>) : null}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export default TableWidget;
