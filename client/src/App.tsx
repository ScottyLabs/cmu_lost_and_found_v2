import About from "./pages/About";
import Accounts from "./pages/Accounts";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Policies from "./pages/Policies";
import TablePage from "./pages/TablePage";

import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

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

// TODO: #138 Replace any with appropriate type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PrivateRoute({ component: Component, ...rest }: any) {
  const token = window.localStorage.getItem("lnf_token");
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
