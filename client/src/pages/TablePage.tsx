import CardWidget from "../components/CardWidget";
import DropdownMenu from "../components/DropdownMenu";
import "./TablePage.css";
import FoundItemModal, {
  lostItemMessage,
  foundItemMessage,
  feedbackForm,
} from "../components/FoundItemModal";
import LogoutButton from "../components/LogoutButton";
import SearchBar from "../components/SearchBar";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import { Item } from "../interface/item";
import { User } from "../interface/user";

import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Grid, Message, Rail } from "semantic-ui-react";

function TablePage() {
  const history = useHistory();

  //what is from the search
  const [input, setInput] = useState("");
  //unfiltered list
  const [itemListDefault, setItemListDefault] = useState([]);
  //filtered list
  const [itemList, setItemList] = useState([]);

  const [user, setUser] = useState<User | null>(null);

  const fetchItems = () => {
    axios
      .post("/api/items/all", {
        token: localStorage.getItem("lnf_token"),
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

  // modify items
  const updateInput = async (input: string) => {
    const inputName = input.toLowerCase();
    const filtered = itemListDefault.filter((item: Item) => {
      return (
        item.description.toLowerCase().includes(inputName) ||
        item.whereFound.toLowerCase().includes(inputName)
      );
    });
    setInput(input);
    setItemList(filtered);
  };

  useEffect(() => {
    getCurrentUser();
    fetchItems();
  }, []);

  const isAllAdmin =
    user?.permissions.includes(`${BuildingType.ALL}:${PermissionType.ADMIN}`) ??
    false;

  return user && (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16} id="">
        <div id="settings">
          <LogoutButton />
          <DropdownMenu page={"/"} isAdmin={user.permissions?.length > 0} isAllAdmin={isAllAdmin}/>
          </div>
          <Link to="/">
            <img src="/dog-logo.png" id="logo-mobile" alt="CMU Lost and Found Logo"></img>
          </Link>
          <h1 className="title">Carnegie Mellon University</h1>
          <h2 className="subtitle">Lost and Found Website</h2>
          <div id="settings">
            <Rail attached internal position="left" id="logo-desktop">
              <Link to="/">
                <img src="/dog-logo.png" alt="CMU Lost and Found Logo"></img>
              </Link>
            </Rail>
            </div>
          </Grid.Column>
            <Grid.Column width={16} id="">
            <div id="description">
            <p>
              To retrieve an object, go to the location listed next to the
              object on the table. You will be required to identify any lost
              possessions. All items must be picked up in person and a photo ID is required.
              For general inquiries, please contact{" "}
              <a href="mailto:lost-and-found@cmu.edu">lost-and-found@cmu.edu</a>.
            </p>
          </div>
        </Grid.Column>
      </Grid.Row>
     
      <Grid.Row>
        <Grid.Column width={16}>
          <Message id="found-item-message" warning size="large">
            <Message.Header>Found an item?</Message.Header>
            {foundItemMessage}
          </Message>
          
          <Message id="feedback-form" warning size="large">
            <Message.Header>Have feedback?</Message.Header>
            {feedbackForm}
          </Message>
        </Grid.Column>
      </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <div id="description">
              <p>
                To retrieve an object, go to the location listed next to the
                object on the corresponding card. You will be required to
                identify any lost possessions. All items must be picked up in
                person and a photo ID is required.
              </p>
            </div>
            <Message id="faq-message" warning size="large">
              <Message.Header>Lost an item?</Message.Header>
              {lostItemMessage}
              <Message.Header>Found an item?</Message.Header>
              {foundItemMessage}
              <Message.Header>Have feedback?</Message.Header>
              {feedbackForm}
            </Message>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <div id="admin-filter-bar">
              <SearchBar input={input} onChange={updateInput} />
              <FoundItemModal
                id="found-item-modal"
                style={{ padding: "11px 11px", width: "110px" }}
              ></FoundItemModal>
            </div>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <main>
              <div id="cards-widget">
                <CardWidget
                  items={itemList}
                  fetchItems={fetchItems}
                ></CardWidget>
              </div>
            </main>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  );
}

export default TablePage;
