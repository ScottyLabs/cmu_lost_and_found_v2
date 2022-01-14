import React, { useState } from "react";
import { Table, Pagination } from "semantic-ui-react";
import { Item } from "../interface/item";
import "./TableWidget.css";
import ImageModal from "./ImageModal";
import ApproveSwitch from "./ApproveSwitch";
import EditButton from "./EditItem";
import AvailableSwitch from "./AvailableSwitch";
import { User } from "../interface/user";
import PublicDisplaySwitch from "./PublicDisplaySwitch";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import HistoryAccordion from "./HistoryAccordion";

const TableWidget = (props: {
  items: Array<Item>;
  isUser: boolean;
  isArchived: boolean;
  fetchItems: Function;
  user: User;
  page: number;
  setPage: Function;
}) => {
  const numberOfItems = 30;
  const handlePageChange = (e: any, value: any) => {
    props.setPage(value.activePage);
  };

  console.log(props.items);

  return (
    <div>
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
            {props.isUser ? (
              <Table.HeaderCell>Available For Pickup</Table.HeaderCell>
            ) : null}
            {props.isUser ? <Table.HeaderCell>Edit</Table.HeaderCell> : null}
            {props.isUser ? <Table.HeaderCell>Approve</Table.HeaderCell> : null}
            <Table.HeaderCell width={2}>History</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.items
            .slice(
              (props.page - 1) * numberOfItems,
              (props.page - 1) * numberOfItems + numberOfItems
            )
            .filter((item) => {
              return (
                (item.status === "available" && item.approved) || props.isUser
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
                props.user.permissions.includes(
                  `${BuildingType.ALL}:${PermissionType.ADMIN}`
                ) ||
                props.user.permissions.includes(
                  `${BuildingType.ALL}:${PermissionType.USER}`
                ) ||
                props.user.permissions.includes(
                  `${item.building}:${PermissionType.ADMIN}`
                ) ||
                props.user.permissions.includes(
                  `${item.building}:${PermissionType.USER}`
                );
              let isAdmin =
                props.user.permissions.includes(
                  `${BuildingType.ALL}:${PermissionType.ADMIN}`
                ) ||
                props.user.permissions.includes(
                  `${item.building}:${PermissionType.ADMIN}`
                );
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
                      <PublicDisplaySwitch
                        id={item._id}
                        isPublicDisplay={item.publicDisplay}
                        disabled={
                          !item.approved ||
                          !isBuilding ||
                          item.status !== "available"
                        }
                        fetchItems={props.fetchItems}
                      ></PublicDisplaySwitch>
                    </Table.Cell>
                  ) : null}
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
                  {props.isUser && (
                    <Table.Cell>
                      <EditButton
                        fetchItems={props.fetchItems}
                        user={props.user}
                        item={item}
                        id={item._id}
                        disabled={!isBuilding}
                      ></EditButton>
                    </Table.Cell>
                  )}
                  {props.isUser && (
                    <Table.Cell>
                      <ApproveSwitch
                        id={item._id}
                        isApproved={item.approved}
                        fetchItems={props.fetchItems}
                        disabled={!isAdmin}
                      ></ApproveSwitch>
                    </Table.Cell>
                  )}
                  <Table.Cell>
                    <HistoryAccordion
                      modified={item.modified}
                      approver={item.approver}
                      returner={item.returner}
                    ></HistoryAccordion>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      <Pagination
        activePage={props.page}
        totalPages={Math.ceil(props.items.length / numberOfItems)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TableWidget;
