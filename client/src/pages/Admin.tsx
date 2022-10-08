import "./Admin.css";
import "semantic-ui-css/semantic.min.css";

// TODO: #109 Fix @typescript-eslint/no-explicit-any in Admin.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import AddItemButton from "../components/AddItemButton";
// import BulkArchiveButton from "../components/BulkArchiveButton";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TableWidget from "../components/TableWidget";
import SearchDropdown from "../components/SearchDropdown";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import { Item } from "../interface/item";
import { User } from "../interface/user";

import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "semantic-ui-react";

function Admin() {
  document.title = "CMU Lost and Found";

  const [_items, setItems] = useState([]);
  //what is from the search
  const [input, setInput] = useState("");
  //unfiltered list
  const [itemListDefault, setItemListDefault] = useState([]);
  //filtered list
  const [itemList, setItemList] = useState([]);

  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("");

  const fetchItems = () => {
    axios
      .post("/api/items/all", {
        token: window.localStorage.getItem("lnf_token"),
      })
      .then(
        (res) => {
          setItems(res.data);
          //added
          setItemListDefault(res.data);
          setItemList(res.data);
        },
        (error) => {
          console.log(error);
          if (error?.response?.status === 401) {
            window.localStorage.removeItem("lnf_token");
            history.push("/login");
          }
        }
      );
  };

  const getCurrentUser = () => {
    axios
      .post("/api/accounts/currentUser", {
        token: window.localStorage.getItem("lnf_token"),
      })
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        } else {
          setUser({ username: "user", permissions: [], notif: false });
        }
      });
  };

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("lnf_token") == null) {
      console.log("not logged in");
      history.push("/login");
      return;
    }
    getCurrentUser();
    fetchItems();
  }, []);

  const isWithinRange = (date1: Date, date2: Date, date: Date) => {
    return date >= date1 && date <= date2;
  };

  const subtractDays = (date: Date, days: any) => {
    return new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  };

  // modify items
  const updateInput = async (input: string) => {
    var filtered;
    if (selected == "Search oldest items by days") {
      filtered = itemListDefault.filter((item: Item) => {
        const minDate = -8640000000000000;
        return isWithinRange(
          new Date(minDate),
          subtractDays(new Date(), input),
          new Date(item.dateFound)
        );
      });
    } else if (selected == "Search by keyword") {
      filtered = itemListDefault.filter((item: Item) => {
        return (
          item.whereFound.toLowerCase().includes(input.toLowerCase()) ||
          item.name.toLowerCase().includes(input.toLowerCase())
        );
      });
    } else if (input != "" && selected == "Search recent items by days") {
      const days = parseInt(input);
      filtered = itemListDefault.filter((item: Item) => {
        return isWithinRange(
          subtractDays(new Date(), days + 1),
          new Date(),
          new Date(item.dateFound)
        );
      });
    } else {
      const inputName = input.toLowerCase();
      filtered = itemListDefault.filter((item: Item) => {
        return (
          item.name.toLowerCase().includes(inputName) ||
          item.description.toLowerCase().includes(inputName) ||
          item.whereFound.toLowerCase().includes(inputName) ||
          item.identification.toLowerCase().includes(inputName) ||
          item.notes.toLowerCase().includes(inputName)
        );
      });
    }
    setInput(input);
    setItemList(filtered);
    setPage(1);
  };

  // sort items
  const sortItems = async (column: string, direction: string) => {
    let sorted = itemListDefault;
    if (column === "whenFound") {
      sorted = itemListDefault.sort((item1: any, item2: any) => {
        const time1 = new Date(item1["dateFound"]).getTime();
        const time2 = new Date(item2["dateFound"]).getTime();
        return time1 === time2
          ? item1["timeFound"].localeCompare(item2["timeFound"])
          : time1 - time2;
      });
    } else {
      sorted = itemListDefault.sort((item1: any, item2: any) => {
        const str1 = String(item1[column]).replace(/\s+/g, "").toLowerCase();
        const str2 = String(item2[column]).replace(/\s+/g, "").toLowerCase();
        return str1.localeCompare(str2);
      });
    }
    if (direction == "descending") sorted.reverse();
    setItemList(sorted);
  };

  // check a value in local storage to decide if account user is an admin for client-side use
  // safe from a security perspective because backend will independently check if user is an admin
  const isAllAdmin =
    user?.permissions.includes(`${BuildingType.ALL}:${PermissionType.ADMIN}`) ??
    false;

  useEffect(() => {
    if (user && user?.permissions?.length === 0) {
      history.push("/");
    }
  }, [user]);

  return (
    user && (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header
              page={"/admin"}
              isAdmin={user.permissions?.length > 0}
              isAllAdmin={isAllAdmin}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <div id="add-mobile">
              <AddItemButton
                fetchItems={fetchItems}
                isAdmin={isAllAdmin}
                permissions={user?.permissions}
              ></AddItemButton>
            </div>
            <div id="admin-filter-bar">
              <SearchDropdown selected={selected} onChange={setSelected} />
              <SearchBar
                input={input}
                onChange={updateInput}
                placeholder={selected}
              />
              <div id="add-desktop">
                <AddItemButton
                  fetchItems={fetchItems}
                  isAdmin={isAllAdmin}
                  permissions={user?.permissions}
                ></AddItemButton>
              </div>
              {/* <div id="bulkarchive-desktop">
                <BulkArchiveButton fetchItems={fetchItems}></BulkArchiveButton>
              </div> */}
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <main>
              <div id="table">
                <TableWidget
                  items={itemList}
                  isUser={true}
                  fetchItems={fetchItems}
                  sortItems={sortItems}
                  user={user}
                  page={page}
                  setPage={setPage}
                ></TableWidget>
              </div>
            </main>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  );
}

export default Admin;
