import React from "react";
import { Grid } from "semantic-ui-react";
import ForgotForm from "../components/ForgotForm";
import "./AdminLogin.css";
import "semantic-ui-css/semantic.min.css";

function Forgot() {
  document.title = "CMU Lost and Found";
  return (
    <Grid>
      <main id="admin-login">
        <h1 id="title">Reset Password</h1>
        <ForgotForm></ForgotForm>
        <br></br>
      </main>
    </Grid>
  );
};

export default Forgot;