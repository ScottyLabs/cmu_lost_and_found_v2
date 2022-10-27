import memoize from "../utils/memoize";

import { jwtVerify, importSPKI } from "jose";
import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router";

interface Props extends RouteProps {
  children: React.ReactNode;
}

const fetchLoginAPIKey = () => {
  return fetch("https://login.scottylabs.org/login/pubkey");
};
const memoizedFetchLoginAPIKey = memoize(fetchLoginAPIKey);

function PrivateRoute({ children, ...rest }: Props) {
  const token = window.localStorage.getItem("lnf_token");
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    memoizedFetchLoginAPIKey()
      .then((res) => res.text())
      .then((data) => importSPKI(data, "RS256"))
      .then((key) => {
        if (token === null) {
          setLoggedIn(false);
          return;
        }
        try {
          jwtVerify(token, key);
          setLoggedIn(true);
        } catch {
          setLoggedIn(false);
        }
      });
  }, [token]);
  return (
    <Route
      {...rest}
      render={() => {
        if (!loggedIn) {
          return <Redirect to="/login" />;
        }
      }}
    >
      {children}
    </Route>
  );
}

export default PrivateRoute;
