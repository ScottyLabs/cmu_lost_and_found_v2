import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Rail } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Admin.css";
import DropdownMenu from "../components/DropdownMenu";
import AddItemButton from "../components/AddItemButton";
import TableWidget from "../components/TableWidget";
import SortedTable from "../components/SortedTable";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { Item } from "../interface/item";
import SearchBar from "../components/SearchBar";
import LogoutButton from "../components/LogoutButton";
import { User } from "../interface/user";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";

function Admin() {
  document.title = "CMU Lost and Found";
  
  const [items, setItems] = useState([]);
  //what is from the search
  const [input, setInput] = useState("");
  //unfiltered list
  const [itemListDefault, setItemListDefault] = useState([]);
  //filtered list
  const [itemList, setItemList] = useState([]);

  const [user, setUser] = useState<User | null>(null);

  const [page, setPage] = useState(1);

  const fetchItems = () => {
    axios
      .post(`/api/items/all`, {
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
    axios.post('/api/accounts/currentUser', {
      token: window.localStorage.getItem("lnf_token")
    }).then(
      (res) => {
        if (res.data) {
          setUser(res.data);
        } else {
          setUser({ username: "user", permissions: [], notif: false });
        }
      }
    )
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

  //modify items
  const updateInput = async (input: string) => {
    const filtered = itemListDefault.filter((item: Item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setItemList(filtered);
    setPage(1);
  };

  // check a value in local storage to decide if account user is an admin for client-side use
  // safe from a security perspective because backend will independently check if user is an admin
  const isAllAdmin = user?.permissions.includes(`${BuildingType.ALL}:${PermissionType.ADMIN}`) ?? false;

  useEffect(() => {
    if (user && user?.permissions?.length === 0) {
      history.push("/");
    }
  }, [user]);

  return user && (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <main>
            <Link to="/">
              <img
                src="/dog-logo.png"
                id="logo-mobile"
                alt="CMU Lost and Found Logo"
              ></img>
            </Link>
            <div id="settings">
              <Rail attached internal position="left" id="logo-desktop">
                <Link to="/">
                  <img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img>
                </Link>
              </Rail>
              <LogoutButton />
              <DropdownMenu page={"/admin"} isAdmin={user.permissions?.length > 0} isAllAdmin={isAllAdmin}/>
            </div>
            <h1 className="title">Carnegie Mellon University</h1>
            <h2 className="subtitle">Lost and Found - Admin Panel</h2>
            <div id="add-mobile">
              <AddItemButton
                fetchItems={fetchItems}
                isAdmin={isAllAdmin}
              ></AddItemButton>
            </div>
            <div id="admin-filter-bar">
              <SearchBar input={input} onChange={updateInput} />
              <div id="add-desktop">
                <AddItemButton
                  fetchItems={fetchItems}
                  isAdmin={isAllAdmin}
                ></AddItemButton>
              </div>
            </div>
            <div id="table">
              <SortedTable 
                items={itemList}
                isUser={true}
                isArchived={false}
                fetchItems={fetchItems}
                user={user}
                page={page}
                setPage={setPage}
              />
              {/* <TableWidget
                items={itemList}
                isUser={true}
                isArchived={false}
                fetchItems={fetchItems}
                user={user}
                page={page}
                setPage={setPage}
              ></TableWidget> */}
            </div>
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Admin;
