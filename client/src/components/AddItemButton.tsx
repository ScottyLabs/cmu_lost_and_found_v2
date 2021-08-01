import axios from "axios";
import React, { useState } from "react";
import { Button, Grid, Modal, Form, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./AddItemButton.css";

function exampleReducer(dispatchState: any, action: any) {
  switch (action.type) {
    case "CONFIG_CLOSE_ON_DIMMER_CLICK":
      return { ...dispatchState, closeOnDimmerClick: action.value };
    case "CONFIG_CLOSE_ON_ESCAPE":
      return { ...dispatchState, closeOnEscape: action.value };
    case "OPEN_MODAL":
      return { ...dispatchState, open: true };
    case "CLOSE_MODAL":
      return { ...dispatchState, open: false };
    default:
      throw new Error();
  }
}

const categories = [
  { key: "clothing", text: "Clothing", value: "Clothing" },
  { key: "headphones", text: "Headphones", value: "Headphones" },
  { key: "jewelry", text: "Jewelry", value: "Jewelry" },
  { key: "keys", text: "Keys", value: "Keys" },
  { key: "laptops", text: "Laptops", value: "Laptops" },
  { key: "phones", text: "Phones", value: "Phones" },
  { key: "students ids", text: "Student IDs", value: "Student IDs" },
  { key: "tablets", text: "Tablets", value: "Tablets" },
  { key: "umbrellas", text: "Umbrellas", value: "Umbrellas" },
  { key: "water bottles", text: "Water Bottles", value: "Water Bottles" },
  {
    key: "other electronics",
    text: "Other Electronics",
    value: "Other Electronics",
  },
  { key: "miscellaneous", text: "Miscellaneous", value: "Miscellaneous" },
];

const pickup = [
  {
    key: "cohon",
    text: "Cohon University Center",
    value: "Cohon University Center",
  },
  {
    key: "gates",
    text: "GHC 6203, 412.268.8525, lostfound@cs.cmu.edu.",
    value: "GHC 6203, 412.268.8525, lostfound@cs.cmu.edu.",
  },
  { key: "tepper", text: "Tepper Building", value: "Tepper Building" },
];

function AddItemButton(props: { fetchItems: Function; isAdmin: boolean }) {
  const [dispatchState, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = dispatchState;

  const [state, setState] = useState({
    dateFound: "",
    timeFound: "",
    name: "",
    whereFound: "",
    description: "",
    whereToRetrieve: "",
    image: "",
    imagePath: "",
    imageObject: null as any,
    imagePermission: false,
    status: "available",
  });

  // Validation error states
  // const[nameError, setNameError] = useState(false);
  // const[dateError, setDateError] = useState(false);
  // const[timeError, setTimeError] = useState(false);
  // const[locationError, setLocationError] = useState(false);
  // const[descriptionError, setDescriptionError] = useState(false);
  const [pickupError, setPickupError] = useState(false);
  const [formError, setFormError] = useState(false);

  const history = useHistory();

  const handleChange = (e: any, { name, value }: any) => {
    setState({ ...state, [name]: value });
  };
  const handleRadioChange = (e: any, value: any) => {
    setState({ ...state, imagePermission: value === "true" });
  };
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: any
  ) => {
    setState({ ...state, [name]: value, imageObject: e!.target!.files![0] });
  };

  const uploadImage = (imageFile: File) => {
    const imageName = "test";

    // no image, TODO: check
    if (!imageFile) {
      return new Promise((resolve, reject) => {
        resolve("");
        return;
      });
    }

    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        let data = {
          imageName: imageName,
          dataURL: reader.result,
          token: localStorage.getItem("lnf_token"),
        };

        axios.post(`/api/items/addImage`, data).then(
          (res) => {
            console.log("Image uploaded successfully");
            console.log(res);
            let finalURL = res.data.msg.fileId;
            console.log(
              "http://drive.google.com/uc?export=view&id=" + finalURL
            );
            resolve("http://drive.google.com/uc?export=view&id=" + finalURL);
            return;
          },
          (error) => {
            console.error(error);
            reject(error);
            return;
          }
        );
      };
      reader.readAsDataURL(imageFile);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      dateFound,
      timeFound,
      name,
      whereFound,
      description,
      whereToRetrieve,
      image,
      imageObject,
      imagePermission,
      status,
    } = state;
    console.log(props.isAdmin);

    let error = false;

    if (whereToRetrieve === "") {
      setPickupError(true);
      error = true;
    } else {
      setPickupError(false);
    }

    if (error) {
      setFormError(true);
      return;
    } else {
      setFormError(false);
    }

    uploadImage(imageObject).then(
      (res) => {
        axios
          .post(`/api/items/add`, {
            token: localStorage.getItem("lnf_token"),
            dateFound: dateFound,
            timeFound: timeFound,
            name: name,
            whereFound: whereFound,
            description: description,
            whereToRetrieve: whereToRetrieve,
            image: res,
            imagePermission: imagePermission,
            status: status,
            approved: props.isAdmin,
          })
          .then(
            (res) => {
              console.log("Added");
              console.log(res);
              props.fetchItems();
            },
            (error) => {
              console.log(error);
              history.push("/login");
            }
          );
        dispatch({ type: "CLOSE_MODAL" });
        setState({
          dateFound: "",
          timeFound: "",
          name: "",
          whereFound: "",
          description: "",
          whereToRetrieve: "",
          image: "",
          imageObject: null,
          imagePath: "",
          imagePermission: false,
          status: "available",
        });
        return res;
      },
      (err) => {
        console.error(err);
      }
    );
  };

  let currentDate = new Date();
  const offset = currentDate.getTimezoneOffset();
  currentDate = new Date(currentDate.getTime() - offset * 60 * 1000);
  let todayDate = currentDate.toISOString().slice(0, 10);

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Modal
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          open={open}
          onOpen={() => dispatch({ type: "OPEN_MODAL" })}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          trigger={
            <Button color="red" style={{ width: "110px" }}>
              Add Item
            </Button>
          }
        >
          <Modal.Header>Add Item</Modal.Header>
          <Modal.Content>
            {/* Need to stop modal from closing when enter key is pressed */}
            <Form onSubmit={handleSubmit} error={formError}>
              {formError ? (
                <Message error content="Missing required field(s)" />
              ) : null}
              <Form.Input
                required
                fluid
                label="Item Name"
                placeholder="Item Name"
                name="name"
                value={state.name}
                onChange={handleChange}
                // error={nameError}
              />
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Date Found"
                  name="dateFound"
                  type="date"
                  placeholder="MM/DD/YYY"
                  max={todayDate}
                  value={state.dateFound}
                  onChange={handleChange}
                  // error={dateError}
                />
                <Form.Input
                  required
                  fluid
                  label="Time Found"
                  name="timeFound"
                  type="time"
                  placeholder="HH:MM"
                  value={state.timeFound}
                  onChange={handleChange}
                  // error={timeError}
                />
                <Form.Input
                  required
                  fluid
                  label="Location Found"
                  name="whereFound"
                  placeholder="Location"
                  value={state.whereFound}
                  onChange={handleChange}
                  // error={locationError}
                />
              </Form.Group>
              <Form.Input
                required
                label="Item Description"
                placeholder="Item Description"
                name="description"
                value={state.description}
                onChange={handleChange}
                // error={descriptionError}
              />
              <Form.Select
                fluid
                required
                label="Pick-Up Location"
                options={pickup}
                placeholder="Pick-Up Location"
                name="whereToRetrieve"
                value={state.whereToRetrieve}
                onChange={handleChange}
                error={pickupError}
              />
              <Form.Input
                label="Image Upload"
                name="imagePath"
                type="file"
                value={state.imagePath}
                onChange={handleFileChange}
              />
              <Form.Group inline id="modal-actions">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    textAlign: "right",
                    width: "100%",
                  }}
                >
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
                </div>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  );
}

export default AddItemButton;
