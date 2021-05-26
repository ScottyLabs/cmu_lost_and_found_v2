import axios from 'axios'
import React, {useState} from 'react'
import { Button, Grid, Modal, Form, Checkbox } from 'semantic-ui-react'
import "./AddUser.css"

function exampleReducer(dispatchState: any, action: any) {
    switch (action.type) {
      case 'CONFIG_CLOSE_ON_DIMMER_CLICK':
        return { ...dispatchState, closeOnDimmerClick: action.value }
      case 'CONFIG_CLOSE_ON_ESCAPE':
        return { ...dispatchState, closeOnEscape: action.value }
      case 'OPEN_MODAL':
        return { ...dispatchState, open: true }
      case 'CLOSE_MODAL':
        return { ...dispatchState, open: false }
      default:
        throw new Error()
    }
  }


function AddUser(props: {
  fetchUsers: Function;
}) {
  const [dispatchState, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  })
  const { open, closeOnEscape, closeOnDimmerClick } = dispatchState

  const [state, setState] = useState({
    username: "",
    password: "",
    isAdmin: false
  });

  const handleChange = (e: any, {name, value}: any) => {
    setState({...state, [name]: value});
  }
  const handlePermissionChange = (e: any, {name, value}: any) => {
    
    value = !value;

    console.log(value)
    setState({...state, [name]: value});
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {username, password, isAdmin} = state;
    axios
      .post(`/api/auth/register`, {
        token: localStorage.getItem("lnf_token"),
        username: username,
        password: password,
        isAdmin: isAdmin
      })
      .then(
        (res) => {
          console.log("Added");
          console.log(res);
          props.fetchUsers();
          
        },
        (error) => {
          console.log(error);
        }
      );
    dispatch({ type: 'CLOSE_MODAL' });
    setState({ username: "",  password:"", isAdmin: false });
  }



  return (
    <Grid columns={1}>
      <Grid.Column>
        <Modal
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          open={open}
          onOpen={() => dispatch({ type: "OPEN_MODAL" })}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          trigger={<Button id="add-user">Add User</Button>}
        >
          <Modal.Header>Add User</Modal.Header>
          <Modal.Content>
            {/* Need to stop modal from closing when enter key is pressed */}
            <Form onSubmit={handleSubmit}>
              <Form.Input
                required
                fluid
                label="Username"
                placeholder="Username"
                name="username"
                value={state.username}
                onChange={handleChange}
              />
              <Form.Input
                required
                fluid
                label="Password"
                placeholder="Password"
                name="password"
                value={state.password}
                onChange={handleChange}
              />
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  control = {Checkbox}
                  label="Admin Permission"
                  name="isAdmin"
                  placeholder="Admin Permission"
                  value={state.isAdmin}
                  onChange={handlePermissionChange}
                />
                </Form.Group>
              <Form.Group inline id="modal-actions">
                <Button
                  onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                  negative
                >
                  Cancel
                </Button>
                {/* Need to close modal after validation of the form */}
                <Button positive type="submit">
                  Add
                </Button>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  );
}

export default AddUser