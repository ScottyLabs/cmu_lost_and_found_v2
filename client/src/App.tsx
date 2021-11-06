import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import TablePage from "./pages/TablePage";
import Accounts from "./pages/Accounts";
import Policies from "./pages/Policies";
import About from "./pages/About";

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
        <PrivateRoute path="/accounts">
          <Accounts />
        </PrivateRoute>
        <PrivateRoute path="/about">
          <About />
        </PrivateRoute>
        <PrivateRoute path="/policies">
          <Policies />
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
