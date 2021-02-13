import React from "react";
import { Form, Table } from "semantic-ui-react";
import { Item } from "../interface/item";
import "./TableWidget.css";
import ImageModal from "./ImageModal";
import ClaimButton from "./ClaimButton";
import UnclaimButton from "./UnclaimButton";

const TableWidget = (props: {
  items: Array<Item>;
  isAdmin: boolean;
  isArchived: boolean;
  fetchItems: Function;
}) => {
  console.log("Creating table");
  return (
    <Form>
      <Form.Checkbox label="Show Archived Items" />
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
            {props.isAdmin ? (
              <Table.HeaderCell>Claim/Unclaim</Table.HeaderCell>
            ) : null}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.items
            .filter((item) => {
              return props.isArchived
                ? item.status !== "available"
                : item.status === "available";
            })
            .map((item: Item) => {
              return (
                <Table.Row key={item._id}>
                  <Table.Cell>{item.dateFound}</Table.Cell>
                  <Table.Cell>{item.timeFound}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.whereFound}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell>{item.whereToRetrieve}</Table.Cell>
                  <Table.Cell>
                    <ImageModal image={item.image}></ImageModal>
                  </Table.Cell>
                  {props.isAdmin ? (
                    <Table.Cell>
                      <ClaimButton
                        id={item._id}
                        disabled={item.status != "available"}
                        fetchItems={props.fetchItems}
                      ></ClaimButton>
                      <UnclaimButton
                        id={item._id}
                        disabled={item.status == "available"}
                        fetchItems={props.fetchItems}
                      ></UnclaimButton>
                    </Table.Cell>
                  ) : null}
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </Form>
  );
};

export default TableWidget;
