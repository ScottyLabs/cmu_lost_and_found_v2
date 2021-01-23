import React from "react";
import { Button, Form} from "semantic-ui-react";
import "./Forms.css";

const ForgotForm = () => (
  <Form>
    <Form.Field>
      <Form.Input label="New Password" placeholder="New Password" type="password"/>
    </Form.Field>
    <Form.Field>
      <Form.Input label="Confirm Password" placeholder="Confirm Password" type="password"/>
    </Form.Field>
    <Button type="submit" id="update-pass">Update Password</Button>
  </Form>
)

export default ForgotForm;