import React from "react";
import { Grid } from "semantic-ui-react";
import LoginForm from "../components/Form";
import "./AdminLogin.css";
import "semantic-ui-css/semantic.min.css";

function AdminLogin() {
  document.title = "CMU Lost and Found";
  return (
    <Grid>
      <main id="form">
        <h1 id="title">Admin Login</h1>
        <LoginForm></LoginForm>
      </main>
    </Grid>
  );
};

export default AdminLogin;