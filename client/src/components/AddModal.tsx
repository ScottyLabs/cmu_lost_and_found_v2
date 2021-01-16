import React from 'react'
import { Button, Grid, Modal, Form, Radio } from 'semantic-ui-react'
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

// const locations = [
//   { key: 'baker', text: 'Baker Hall', value: '' },
//   { key: 'cohon', text: 'Cohon University Center', value: 'cohon university center' },
//   { key: 'doherty', text: 'Doherty Hall', value: 'doherty hall' },
//   { key: 'gates', text: 'Gates Center', value: 'gates center' },
//   { key: 'hamburg', text: 'Hamburg Hall', value: 'hamburg hall' },
//   { key: 'hunt', text: 'Hunt Library', value: 'hunt library' },
//   { key: 'hamerschlag', text: 'Hamerschlag Hall', value: 'hamerschlag hall' },
//   { key: 'margaret', text: 'Margaret Morrison Hall', value: 'margaret morrison hall' },
//   { key: 'porter', text: 'Porter Hall', value: 'porter hall' },
//   { key: 'posner', text: 'Posner Hall', value: 'posner hall' },
//   { key: 'sorrells', text: 'Sorrells Library', value: 'sorrells library' },
//   { key: 'tepper', text: 'Tepper Building', value: 'tepper building' },
//   { key: 'wean', text: 'Wean Hall', value: 'wean hall' },
// ]

const pickup = [
  { key: 'cohon', text: 'Cohon University Center', value: 'cohon university center' },
  { key: 'gates', text: 'Gates Center', value: 'gates center' },
  { key: 'tepper', text: 'Tepper Building', value: 'tepper building' },
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
            <Form onSubmit={(e)=>{e.preventDefault()}}>
              <Form.Input required fluid label='Item Name' placeholder='Item Name'/>
              <Form.Group widths='equal'>
                <Form.Input required fluid label='Date Found' type='date' placeholder='MM/DD/YYY'/>
                <Form.Input required fluid label='Time Found' type='time' placeholder='HH:MM'/>
                <Form.Input required fluid label='Location Found' placeholder='Location'/>    
              </Form.Group>
              <Form.Input required label='Item Description' placeholder='Item Description' />
              <Form.Group widths='equal'>
                <Form.Input fluid type='email' label='Contact Email' placeholder='example@cmu.edu'/>
                <Form.Select fluid label='Pick-Up Location' options={pickup} placeholder='Pick-Up Location'/>  
              </Form.Group>
              <Form.Input required label='Image Upload' type='file'/>
              <Form.Group inline>
                <label>Image Visibility</label>
                {/* <Radio toggle></Radio> */}
                <Form.Field label='Private' control='input' type='radio' name='htmlRadios' defaultChecked/>
                <Form.Field label='Public' control='input' type='radio' name='htmlRadios'/>
              </Form.Group>
              <Form.Group inline id='modal-actions'>
                <Button onClick={() => dispatch({ type: 'CLOSE_MODAL' })} negative>Cancel</Button>
                {/* Need to close modal after validation of the form */}
                <Button positive type="submit">Add</Button>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  )
}

export default AddModal