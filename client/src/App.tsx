import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import TablePage from "./pages/TablePage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact strict path="/">
          <Home />
        </Route>
        <Route path="/table">
          <TablePage />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

