import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Items from "./pages/Items";
import TablePage from "./pages/TablePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact strict path="/">
          <Home />
        </Route>
        <Route path="/AdminLogin">
          <AdminLogin />
        </Route>
        <Route path="/Admin">
          <Admin />
        </Route>
        <Route path="/Items">
          <Items />
        </Route>
        <Route path="/table">
          <TablePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

