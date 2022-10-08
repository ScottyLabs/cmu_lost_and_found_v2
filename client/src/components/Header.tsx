import DropdownMenu from "../components/DropdownMenu";
import LogoutButton from "../components/LogoutButton";

import * as React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = (props: {
  page: string;
  isAdmin: boolean;
  isAllAdmin: boolean;
}) => {
  const pageTitle = () => {
    const withoutSlash = props.page.slice(1);
    return withoutSlash.length == 0
      ? ""
      : "- " + withoutSlash.charAt(0).toUpperCase() + withoutSlash.slice(1);
  };
  return (
    <header>
      <div id="site-identity">
        <Link to="/">
          <img
            src="/dog-logo.png"
            id="logo-mobile"
            alt="CMU Lost and Found Logo"
          ></img>
          <img
            src="/dog-logo.png"
            id="logo-desktop"
            alt="CMU Lost and Found Logo"
          ></img>
        </Link>
        <div id="page-titles">
          <h1 className="title">Carnegie Mellon University</h1>
          <h2 className="subtitle">Lost and Found Website {pageTitle()}</h2>
        </div>
      </div>
      <div id="navigation">
        <DropdownMenu
          page={props.page}
          isAdmin={props.isAdmin}
          isAllAdmin={props.isAllAdmin}
        />
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
