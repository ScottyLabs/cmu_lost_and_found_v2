import "./TableWidget.css";
import BulkArchiveButton from "../components/BulkArchiveButton";
import DownloadDataButton from "../components/DownloadDataButton";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import { Item } from "../interface/item";
import { User } from "../interface/user";
import { SortConfig } from "../utils/itemTableUtils";
import AddItemButton from "./AddItemButton";
import ApproveSwitch from "./ApproveSwitch";
import AvailableSwitch from "./AvailableSwitch";
import EditButton from "./EditItem";
import HistoryAccordion from "./HistoryAccordion";
import PublicDisplaySwitch from "./PublicDisplaySwitch";
import UnarchiveButton from "./UnarchiveButton";

import * as React from "react";
import { Table, Pagination } from "semantic-ui-react";

const TableWidget = (props: {
  items: Array<Item>;
  isUser: boolean;
  fetchItems: () => void;
  sort: SortConfig;
  setSort: React.Dispatch<React.SetStateAction<SortConfig>>;
  isArchivedItems: boolean;
  user: User;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const numberOfItems = 30;

  function changeSort(column: string) {
    if (props.sort.column === column) {
      const newDir =
        props.sort.direction === "ascending" ? "descending" : "ascending";
      props.setSort({ ...props.sort, direction: newDir });
    } else {
      props.setSort({ column, direction: "ascending" });
    }
  }

  // check a value in local storage to decide if account user is an admin for client-side use
  // safe from a security perspective because backend will independently check if user is an admin
  const isAllAdmin =
    props.user?.permissions.includes(
      `${BuildingType.ALL}:${PermissionType.ADMIN}`
    ) ?? false;

  const isAdmin = props.user?.permissions.some((value) =>
    value.includes(PermissionType.ADMIN)
  );

  return (
    <div>
      <div className="table-buttons">
        <div>
          <DownloadDataButton onlyArchived={props.isArchivedItems} />
          {!props.isArchivedItems && isAdmin ? (
            <BulkArchiveButton
              fetchItems={props.fetchItems}
            ></BulkArchiveButton>
          ) : null}
        </div>
        {!props.isArchivedItems ? (
          <AddItemButton
            fetchItems={props.fetchItems}
            isAdmin={isAllAdmin}
            permissions={props.user?.permissions}
          ></AddItemButton>
        ) : null}
      </div>
      <Table sortable celled className="lf_table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              width={1}
              sorted={
                props.sort.column === "whenFound"
                  ? props.sort.direction
                  : undefined
              }
              onClick={() => changeSort("whenFound")}
            >
              When Found
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.sort.column === "name" ? props.sort.direction : undefined
              }
              onClick={() => changeSort("name")}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.sort.column === "whereFound"
                  ? props.sort.direction
                  : undefined
              }
              onClick={() => changeSort("whereFound")}
            >
              Where Found
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.sort.column === "description"
                  ? props.sort.direction
                  : undefined
              }
              onClick={() => changeSort("description")}
            >
              Description
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={
                props.sort.column === "building"
                  ? props.sort.direction
                  : undefined
              }
              onClick={() => changeSort("building")}
            >
              Building
            </Table.HeaderCell>
            {!props.isArchivedItems && props.isUser ? (
              <Table.HeaderCell
                sorted={
                  props.sort.column === "publicDisplay"
                    ? props.sort.direction
                    : undefined
                }
                onClick={() => changeSort("publicDisplay")}
              >
                Make Public
              </Table.HeaderCell>
            ) : null}
            {!props.isArchivedItems && props.isUser ? (
              <Table.HeaderCell
                sorted={
                  props.sort.column === "status"
                    ? props.sort.direction
                    : undefined
                }
                onClick={() => changeSort("status")}
              >
                Available For Pickup
              </Table.HeaderCell>
            ) : null}
            {!props.isArchivedItems && props.isUser ? (
              <Table.HeaderCell>Edit</Table.HeaderCell>
            ) : null}
            {!props.isArchivedItems && props.isUser ? (
              <Table.HeaderCell
                sorted={
                  props.sort.column === "approved"
                    ? props.sort.direction
                    : undefined
                }
                onClick={() => changeSort("approved")}
              >
                Approve
              </Table.HeaderCell>
            ) : null}
            <Table.HeaderCell width={2}>History</Table.HeaderCell>
            {props.isArchivedItems ? (
              <Table.HeaderCell>Unarchive</Table.HeaderCell>
            ) : null}
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
              const date = new Date(item.dateFound)
                .toISOString()
                .substring(0, 10)
                .split("-");
              const dateFormatted = date[1] + "/" + date[2] + "/" + date[0];
              const [h, m] = item.timeFound.split(":");
              const timeFormatted =
                (parseInt(h) % 12) +
                (parseInt(h) % 12 === 0 ? 12 : 0) +
                ":" +
                m +
                " " +
                (parseInt(h) >= 12 ? "PM" : "AM");
              const isBuilding =
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
              const isAdmin =
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
                  {!props.isArchivedItems && props.isUser ? (
                    <Table.Cell>
                      <PublicDisplaySwitch
                        id={item._id}
                        isPublicDisplay={item.publicDisplay}
                        disabled={
                          !item.approved ||
                          !isBuilding ||
                          item.status !== "available" ||
                          item.value === "high value" ||
                          item.identifiable
                        }
                        fetchItems={props.fetchItems}
                      ></PublicDisplaySwitch>
                    </Table.Cell>
                  ) : null}
                  {!props.isArchivedItems && props.isUser ? (
                    <Table.Cell>
                      <AvailableSwitch
                        id={item._id}
                        isAvailable={item.status === "available"}
                        disabled={!isBuilding}
                        fetchItems={props.fetchItems}
                      ></AvailableSwitch>
                    </Table.Cell>
                  ) : null}
                  {!props.isArchivedItems && props.isUser && (
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
                  {!props.isArchivedItems && props.isUser && (
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
                      archiver={item.archiver}
                      isArchived={item.archived}
                    ></HistoryAccordion>
                  </Table.Cell>

                  {props.isArchivedItems ? (
                    <Table.Cell>
                      <UnarchiveButton
                        id={item._id}
                        fetchItems={props.fetchItems}
                      />
                    </Table.Cell>
                  ) : null}
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      <Pagination
        activePage={props.page}
        totalPages={Math.ceil(props.items.length / numberOfItems)}
        onPageChange={(_e, value) => {
          switch (typeof value.activePage) {
            case "number":
              props.setPage(value.activePage);
              break;
            case "string":
              props.setPage(parseInt(value.activePage));
              break;
            case "undefined":
              props.setPage(1);
              break;
          }
        }}
      />
    </div>
  );
};

export default TableWidget;
