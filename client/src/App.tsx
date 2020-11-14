import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact strict path="/">
          <Home />
        </Route>
        <Route path="/Admin">
          <Admin />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

