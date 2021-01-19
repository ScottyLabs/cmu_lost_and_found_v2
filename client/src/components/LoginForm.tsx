import React from "react";
import { Button, Form} from "semantic-ui-react";
import { Link } from "react-router-dom"; 
import "./Forms.css";

const LoginForm = () => (
  <Form>
    <Form.Field>
      <Form.Input label="Username" placeholder="Username"/>
    </Form.Field>
    <Form.Field>
      <Form.Input label="Password" placeholder="Password" type="password"/>
    </Form.Field>
    <Form.Field>
      <Link to="/Forgot" id="forgot">Forgot Password?</Link>
    </Form.Field>
    <Link to = "/Admin"><Button type="submit">Submit</Button></Link>
  </Form>
)

export default LoginForm