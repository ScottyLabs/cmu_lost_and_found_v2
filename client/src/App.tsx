import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import TablePage from "./pages/TablePage";
// import Settings from "./pages/Settings";
import Accounts from "./pages/Accounts";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact strict path="/" component={TablePage} />
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        {/* <Route path="/items">
          <TablePage />
        </Route> */}
        <PrivateRoute path="/accounts">
          <Accounts />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

function PrivateRoute({ component: Component, ...rest }: any) {
  const token = window.localStorage.getItem("lnf_token")
  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default App;
