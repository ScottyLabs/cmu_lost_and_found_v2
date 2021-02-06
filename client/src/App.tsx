import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Archived from "./pages/Archived";
import Items from "./pages/Items";
import TablePage from "./pages/TablePage";
import Forgot from "./pages/Forgot";
import Settings from "./pages/Settings";
import ImageTestPage from "./pages/ImageTestPage";
import UserMenu from "./pages/UserMenu";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact strict path="/">
          <Home />
        </Route>
        <Route path="/login">
          <AdminLogin />
        </Route>
        <Route path="/Admin">
          <Admin />
        </Route>
        <Route path="/Archived">
          <Archived />
        </Route>
        <Route path="/Items">
          <Items />
        </Route>
        <Route path="/table">
          <TablePage />
        </Route>
        <Route path="/Forgot">
          <Forgot />
        </Route>
        <Route path="/Settings">
          <Settings />
        </Route>
        <Route path="/ImageTest">
          <ImageTestPage />
        </Route>
        <Route path="/users">
          <UserMenu />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

