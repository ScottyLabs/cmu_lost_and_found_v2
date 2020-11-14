import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Page2 from "./pages/Page2";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact strict path="/">
          <Home />
        </Route>
        <Route path="/page2">
          <Page2 />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

