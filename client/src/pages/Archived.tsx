/* eslint-disable */
import "./Active.css";
import "semantic-ui-css/semantic.min.css";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SearchDropdown from "../components/SearchDropdown";
import TableWidget from "../components/TableWidget";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import { Item } from "../interface/item";
import { User } from "../interface/user";

import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import {
  filterItems,
  SearchConfig,
  SortConfig,
  sortItems,
} from "../utils/itemTableUtils";

function Archived() {
  document.title = "CMU Lost and Found";

  //unfiltered list
  const [itemListDefault, setItemListDefault] = useState<Item[]>([]);
  //filtered list
  const [itemList, setItemList] = useState<Item[]>([]);

  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState<SearchConfig>({
    value: "",
    setting: "Keyword",
    placeholder: "e.g. keys",
  });

  const [sort, setSort] = useState<SortConfig>({
    column: undefined,
    direction: undefined,
  });

  const fetchItems = () => {
    axios
      .post("/api/items/all", {
        token: window.localStorage.getItem("lnf_token"),
        onlyArchived: true,
      })
      .then(
        (res) => {
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

  useEffect(() => {
    const filtered = filterItems(itemListDefault, search);
    const sorted = sortItems(
      filtered,
      (sort.column as keyof Item) ?? "whenFound",
      sort.direction ?? "descending"
    );
    setItemList(sorted);
    if (Math.ceil(sorted.length / 30) < page && page !== 1) {
      setPage(page - 1);
    }
  }, [itemListDefault, search, sort]);

  return (
    user && (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header
              page={"/archived"}
              isAdmin={user.permissions?.length > 0}
              isAllAdmin={isAllAdmin}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <div id="admin-filter-bar">
              <SearchDropdown value={search} onChange={setSearch} />
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder={search.placeholder}
              />
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
                  sort={sort}
                  setSort={setSort}
                  isArchivedItems={true}
                  user={user}
                  page={page}
                  setPage={setPage}
                ></TableWidget>
              </div>
            </main>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
    )
  );
}

export default Archived;
