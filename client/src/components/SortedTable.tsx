import _ from 'lodash';
import React, { useState } from 'react';
import { Table, Pagination } from 'semantic-ui-react';
import { Item } from "../interface/item";
import "./TableWidget.css";
import ImageModal from "./ImageModal";
import ApproveSwitch from "./ApproveSwitch";
import EditButton from "./EditItem";
import AvailableSwitch from "./AvailableSwitch";
import { User } from "../interface/user";
import PublicDisplaySwitch from "./PublicDisplaySwitch";

function exampleReducer(state: any, action: any) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        }
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      }
    default:
      throw new Error()
  }
}

const SortedTable = (props: {
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

  const [state, dispatch] = React.useReducer(exampleReducer, {
    column: null,
    data: props.items,
    direction: null,
  })
  const { column, data, direction } = state

  return (
    <div>
      <Table sortable celled className="lf_table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} className="unclickable">When Found</Table.HeaderCell>
            <Table.HeaderCell className="unclickable">Name</Table.HeaderCell>
            <Table.HeaderCell className="unclickable">Where Found</Table.HeaderCell>
            <Table.HeaderCell className="unclickable">Description</Table.HeaderCell>
            <Table.HeaderCell className="unclickable">Building</Table.HeaderCell>
            <Table.HeaderCell className="unclickable">Image</Table.HeaderCell>
            {props.isUser ? (
              <Table.HeaderCell
                sorted={column === 'publicDisplay' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'publicDisplay' })}
              >
                Make Public
              </Table.HeaderCell>
            ) : null}
            {props.isUser ? (
              <Table.HeaderCell
                sorted={column === 'status' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'status' })}
              >
                Available For Pickup
              </Table.HeaderCell>
            ) : null}
            {props.isUser ? <Table.HeaderCell className="unclickable">Edit</Table.HeaderCell> : null}
            {props.isUser ? (
              <Table.HeaderCell
                sorted={column === 'approved' ? direction : null}
                onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'approved' })}
              >
                Approve
              </Table.HeaderCell>
            ) : null}
            <Table.HeaderCell className="unclickable">Last Modified By</Table.HeaderCell>
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
      <Pagination
        activePage={props.page}
        totalPages={Math.ceil(props.items.length / numberOfItems)}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default SortedTable