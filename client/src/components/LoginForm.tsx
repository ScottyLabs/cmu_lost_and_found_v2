// TODO: #118 Replace all any types with appropriate annotations
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import "./LoginForm.css";

export default function LoginForm() {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  const handleChange = (e: any, { name, value }: any) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = state;
    axios
      .post("/api/auth/login", {
        username: username,
        password: password,
      })
      .then(
        (res) => {
          const token = res.data.token;
          const isAdmin = res.data.isAdmin;
          console.log(token);
          console.log(isAdmin);
          localStorage.setItem("lnf_token", token);
          console.log("Logged in");
          history.push("/active");
          setState({ username: "", password: "" });
        },
        (error) => {
          console.log(error);
          alert("Invalid username or password");
          setState({ username: "", password: "" });
        }
      );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Form.Input
          label="Password"
          placeholder="Password"
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
      </Form.Field>
      {/* <Form.Field>
        <Link to="/Forgot" id="forgot">
          Forgot Password?
        </Link>
      </Form.Field> */}
      <Button type="submit">Submit</Button>
    </Form>
  );
}
