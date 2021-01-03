import React from 'react'
import { Button, Grid, Modal, Form } from 'semantic-ui-react'
// import AddForm from '../components/AddForm';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'CONFIG_CLOSE_ON_DIMMER_CLICK':
      return { ...state, closeOnDimmerClick: action.value }
    case 'CONFIG_CLOSE_ON_ESCAPE':
      return { ...state, closeOnEscape: action.value }
    case 'OPEN_MODAL':
      return { ...state, open: true }
    case 'CLOSE_MODAL':
      return { ...state, open: false }
    default:
      throw new Error()
  }
}

const locations = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

const pickup = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

function AddModal() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  })
  const { open, closeOnEscape, closeOnDimmerClick } = state

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Modal
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          open={open}
          onOpen={() => dispatch({ type: 'OPEN_MODAL' })}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
          trigger={<Button id="add-item">Add Item</Button>}
        >
          <Modal.Header>Add Item</Modal.Header>
          <Modal.Content>
            {/* Need to stop modal from closing when enter key is pressed */}
            <Form>
              <Form.Input required fluid label='Item Name' placeholder='Item Name'/>
              <Form.Group widths='equal'>
                <Form.Input required fluid label='Date Found' placeholder='MM/DD/YYY'/>
                <Form.Input required fluid label='Time Found' placeholder='HH:MM'/>
                {/* Need to manually require location selection?? */}
                <Form.Select required fluid label='Location Found' options={locations} placeholder='Location'/>    
              </Form.Group>
              <Form.TextArea required label='Item Description' placeholder='Item Description' />
              <Form.Group widths='equal'>
                <Form.Input fluid type='email' label='Contact Email' placeholder='example@cmu.edu'/>
                <Form.Select fluid label='Pick-Up Location' options={pickup} placeholder='Pick-Up Location'/>  
              </Form.Group>
              <Form.Input required label='Image Upload' type='file'/>
              <Form.Group inline>
                <label>Image Permissions</label>
                <Form.Field label='Private' control='input' type='radio' name='htmlRadios'/>
                <Form.Field label='Public' control='input' type='radio' name='htmlRadios'/>
              </Form.Group>
              <Form.Group inline id='modal-actions'>
                <Button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} negative>Cancel</Button>
                {/* Need to close modal after validation of the form */}
                <Button type='submit' positive>Add</Button>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  )
}

export default AddModal





