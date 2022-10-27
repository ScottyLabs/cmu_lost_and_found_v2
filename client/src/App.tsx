import "./App.css";

import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import Accounts from "./pages/Accounts";
import Active from "./pages/Active";
import Archived from "./pages/Archived";
import Login from "./pages/Login";
import Policies from "./pages/Policies";
import TablePage from "./pages/TablePage";

import * as React from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact strict path="/">
          <TablePage />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/active">
          <Active />
        </PrivateRoute>
        <PrivateRoute path="/archived">
          <Archived />
        </PrivateRoute>
        <PrivateRoute path="/policies">
          <Policies />
        </PrivateRoute>
        <PrivateRoute path="/about">
          <About />
        </PrivateRoute>
        <PrivateRoute path="/accounts">
          <Accounts />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
