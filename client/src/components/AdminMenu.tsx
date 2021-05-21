import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function AdminMenu(props: { activeTab: string }) {

  return (
    <Menu secondary fluid vertical>
      <Link to="/admin">
        <Menu.Item
          name="available items"
          active={props.activeTab === "admin"}
        />
      </Link>
      <Link to="/Archived">
        <Menu.Item
          name="archived items"
          active={props.activeTab === "archived"}
        />
      </Link>
      <Link to="/Settings">
        <Menu.Item
          name="settings"
          active={props.activeTab === "settings"}
        />
      </Link>
      <Link to="/accounts">
        <Menu.Item
          name="user menu"
          active={props.activeTab === "user menu"}
        />
      </Link>
    </Menu>
  );
}
