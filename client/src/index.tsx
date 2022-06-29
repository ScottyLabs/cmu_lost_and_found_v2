import App from "./App";
import reportWebVitals from "./reportWebVitals";

import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
