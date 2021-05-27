import React, { useState } from "react";
import { Form, Table } from "semantic-ui-react";
import { Item } from "../interface/item";
import "./TableWidget.css";
import ImageModal from "./ImageModal";
import SwitchButton from "./SwitchButton";
import ApproveSwitch from "./ApproveSwitch";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditItem";
const TableWidget = (props: {
  items: Array<Item>;
  isUser: boolean;
  isAdmin: boolean;
  isArchived: boolean;
  fetchItems: Function;
}) => {
  const [displayArchived, setDisplayArchived] = useState(false);

  const updateDisplayArchived = (evt: any, data: any) => {
    setDisplayArchived(data.checked);
  };

  return (
    <Form>
      {props.isUser ? (
        <Form.Checkbox
          label="Show Archived Items"
          onClick={updateDisplayArchived}
        />
      ) : null}
      <Table celled className="lf_table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>Date Found</Table.HeaderCell>
            <Table.HeaderCell width={1}>Time Found</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Where Found</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Where to Retrieve</Table.HeaderCell>
            <Table.HeaderCell>Image</Table.HeaderCell>
            {props.isUser ? (
              <Table.HeaderCell>Claimed/Unclaimed</Table.HeaderCell>
            ) : null}
            {props.isAdmin ? (
              <Table.HeaderCell>Approve</Table.HeaderCell>
            ) : null}
            {props.isAdmin ? <Table.HeaderCell>Edit</Table.HeaderCell> : null}
            {props.isAdmin ? <Table.HeaderCell>Delete</Table.HeaderCell> : null}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.items
            .filter((item) => {
              return (
                (item.status === "available" && item.approved) ||
                (props.isUser &&
                  (displayArchived || item.status === "available"))
              );
            })
            .map((item: Item) => {
              let date = new Date(item.dateFound)
                .toISOString()
                .substring(0, 10)
                .split("-");
              let dateFormatted = date[1] + "/" + date[2] + "/" + date[0];
              let [h, m] = item.timeFound.split(":");
              let timeFormatted =
                (parseInt(h) % 12) +
                (parseInt(h) % 12 === 0 ? 12 : 0) +
                ":" +
                m +
                " " +
                (parseInt(h) >= 12 ? "PM" : "AM");
              return (
                <Table.Row key={item._id}>
                  <Table.Cell>{dateFormatted}</Table.Cell>
                  <Table.Cell>{timeFormatted}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.whereFound}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell>{item.whereToRetrieve}</Table.Cell>
                  <Table.Cell>
                    <ImageModal image={item.image}></ImageModal>
                  </Table.Cell>
                  {props.isUser ? (
                    <Table.Cell>
                      <SwitchButton
                        id={item._id}
                        isClaimed={item.status !== "available"}
                        disabled={!item.approved}
                        fetchItems={props.fetchItems}
                      ></SwitchButton>
                    </Table.Cell>
                  ) : null}
                  {props.isAdmin ? (
                    <Table.Cell>
                      <ApproveSwitch
                        id={item._id}
                        isApproved={item.approved}
                        fetchItems={props.fetchItems}
                      ></ApproveSwitch>
                    </Table.Cell>
                  ) : null}
                  {props.isAdmin ? (
                    <Table.Cell>
                      <EditButton
                        fetchItems={props.fetchItems}
                        isAdmin={props.isAdmin}
                        item={item}
                        id={item._id}
                      ></EditButton>
                    </Table.Cell>
                  ) : null}
                  {props.isAdmin ? (
                    <Table.Cell>
                      <DeleteButton
                        id={item._id}
                        fetchItems={props.fetchItems}
                      ></DeleteButton>
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
