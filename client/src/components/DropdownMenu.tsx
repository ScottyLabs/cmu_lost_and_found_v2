import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { Dropdown } from "semantic-ui-react";
import "./DropdownMenu.css";

const DropdownMenu = (props: {
  page: string;
  isAdmin: boolean;
  isAllAdmin: boolean;
}) => {
  const history = useHistory();

  return (
    <Dropdown
      icon="bars"
      floating
      button
      className="icon black"
      style={{ color: "#ffffff" }}
    >
      <Dropdown.Menu>
        {
          <Dropdown.Item onClick={() => history.push("/")}>
            <Link to="/">Home</Link>
          </Dropdown.Item>
        }
        {
          <Dropdown.Item onClick={() => history.push("/about")}>
            <Link to="/about">About</Link>
          </Dropdown.Item>
        }
        {
          <Dropdown.Item onClick={() => history.push("/policies")}>
            <Link to="/policies">Policies</Link>
          </Dropdown.Item>
        }
        {props.isAdmin ? (
          <Dropdown.Item onClick={() => history.push("/active")}>
            <Link to="/active">Active</Link>
          </Dropdown.Item>
        ) : null}
        {props.isAdmin ? (
          <Dropdown.Item onClick={() => history.push("/archived")}>
            <Link to="/archived">Archived</Link>
          </Dropdown.Item>
        ) : null}
        {props.isAllAdmin ? (
          <Dropdown.Item onClick={() => history.push("/accounts")}>
            <Link to="/accounts">Accounts</Link>
          </Dropdown.Item>
        ) : null}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
