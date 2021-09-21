import React, { useState } from "react";
import { Form, Table } from "semantic-ui-react";
import { Item } from "../interface/item";
import "./TableWidget.css";
import ImageModal from "./ImageModal";
import ApproveSwitch from "./ApproveSwitch";
import EditButton from "./EditItem";
import AvailableSwitch from "./AvailableSwitch";
import { User } from "../interface/user";
const TableWidget = (props: {
  items: Array<Item>;
  isUser: boolean;
  isArchived: boolean;
  fetchItems: Function;
  user: User;
}) => {
  const [displayArchived, setDisplayArchived] = useState(true);

  const updateDisplayArchived = (evt: any, data: any) => {
    setDisplayArchived(data.checked);
  };

  return (
    <Form>
      {/* {props.isUser ? (
        <Form.Checkbox
          label="Show Archived Items"
          onClick={updateDisplayArchived}
        />
      ) : null} */}
      <Table celled className="lf_table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>When Found</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Where Found</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Building</Table.HeaderCell>
            <Table.HeaderCell>Image</Table.HeaderCell>
            {props.isUser ? (
              <Table.HeaderCell>Make Public</Table.HeaderCell>
            ) : null}
            {props.isUser ? <Table.HeaderCell>Edit</Table.HeaderCell> : null}
            {props.isUser ? (
              <Table.HeaderCell>Approve</Table.HeaderCell>
            ) : null}
            <Table.HeaderCell>Last Modified By</Table.HeaderCell>
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
              let isBuilding = 
                props.user.permissions.includes("ALL:ADMIN") || 
                props.user.permissions.includes("ALL:USER") ||
                props.user.permissions.includes(`${item.building}:ADMIN`) ||
                props.user.permissions.includes(`${item.building}:USER`);
              let isAdmin =
                props.user.permissions.includes("ALL:ADMIN") ||
                props.user.permissions.includes(`${item.building}:ADMIN`);
              return (
                <Table.Row key={item._id}>
                  <Table.Cell>
                    {dateFormatted} <br></br> {timeFormatted}
                  </Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.whereFound}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{item.building}</Table.Cell>
                  <Table.Cell>
                    <ImageModal image={item.image}></ImageModal>
                  </Table.Cell>
                  {props.isUser ? (
                    <Table.Cell>
                      <AvailableSwitch
                        id={item._id}
                        isAvailable={item.status === "available"}
                        disabled={!isBuilding}
                        fetchItems={props.fetchItems}
                      ></AvailableSwitch>
                    </Table.Cell>
                  ) : null}
                  {props.isUser ? (
                    <Table.Cell>
                      <EditButton
                        fetchItems={props.fetchItems}
                        user={props.user}
                        item={item}
                        id={item._id}
                        disabled={!isBuilding}
                      ></EditButton>
                    </Table.Cell>
                  ) : null}
                  {props.isUser ? (
                    <Table.Cell>
                      <ApproveSwitch
                        id={item._id}
                        isApproved={item.approved}
                        fetchItems={props.fetchItems}
                        disabled={!isAdmin}
                      ></ApproveSwitch>
                    </Table.Cell>
                  ) : null}
                  <Table.Cell>{item.username}</Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </Form>
  );
};

export default TableWidget;
