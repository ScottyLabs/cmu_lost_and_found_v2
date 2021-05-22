import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
// import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Items from "./pages/Items";
import TablePage from "./pages/TablePage";
import Settings from "./pages/Settings";
import ImageTestPage from "./pages/ImageTestPage";
import Accounts from "./pages/Accounts";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact strict path="/">
          {/* <Home /> */}
          <TablePage />
        </Route>
        <Route path="/login">
          <AdminLogin />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/Items">
          <Items />
        </Route>
        <Route path="/Settings">
          <Settings />
        </Route>
        <Route path="/ImageTest">
          <ImageTestPage />
        </Route>
        <Route path="/accounts">
          <Accounts />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

