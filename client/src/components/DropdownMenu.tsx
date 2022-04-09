import React from "react";
import { Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./DropdownMenu.css";

const DropdownMenu = (props: {
  page: String;
  isAdmin: boolean;
  isAllAdmin: boolean;
}) => {

  const history = useHistory();

  return (
    <Dropdown icon='bars' floating button className='icon black' style = {{color:'#ffffff'}}>
      <Dropdown.Menu>
        {props.page !== "/" ? (
          <Dropdown.Item onClick={() => history.push("/")}><Link to="/">Home</Link></Dropdown.Item>
        ) : null}
        {props.page !== "/about" ? (
          <Dropdown.Item onClick={() => history.push("/about")}><Link to="/about">About</Link></Dropdown.Item>
        ) : null}
        {props.page !== "/policies" ? (
          <Dropdown.Item onClick={() => history.push("/policies")}><Link to="/policies">Policies</Link></Dropdown.Item>
        ) : null}
        {props.page !== "/admin" && props.isAdmin ? (
          <Dropdown.Item onClick={() => history.push("/admin")}><Link to="/admin">Admin Panel</Link></Dropdown.Item>
        ) : null}
        {props.page !== "/accounts" && props.isAllAdmin ? (
          <Dropdown.Item onClick={() => history.push("/accounts")}><Link to="/accounts">Accounts</Link></Dropdown.Item>
        ) : null}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownMenu;