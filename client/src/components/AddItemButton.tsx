import axios from "axios";
import React, { useState } from "react";
import { Button, Grid, Modal, Form, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddItemButton.css";
import { BuildingType } from "../enums/locationTypes";

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

const buildings = Object.keys(BuildingType)
  .filter((value) => value !== "ALL")
  .map((key) => ({
    key,
    text: key,
    value: key,
  }));

function AddItemButton(props: { fetchItems: Function; isAdmin: boolean }) {
  const [dispatchState, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = dispatchState;

  const [state, setState] = useState({
    date: new Date(),
    name: "",
    whereFound: "",
    description: "",
    building: "",
    image: "",
    imagePath: "",
    imageObject: null as any,
    imagePermission: false,
    status: "available",
    identification: "",
    notes: "",
  });

  // Validation error states
  // const[nameError, setNameError] = useState(false);
  // const[dateError, setDateError] = useState(false);
  // const[timeError, setTimeError] = useState(false);
  // const[locationError, setLocationError] = useState(false);
  // const[descriptionError, setDescriptionError] = useState(false);
  const [buildingError, setBuildingError] = useState(false);
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
            let finalID = res.data.msg.fileId;
            let finalURL =
              "https://drive.google.com/thumbnail?id=" + finalID + "&sz=w1000";
            console.log(finalURL);
            resolve(finalURL);
            return;
          },
          (error) => {
            console.error(error);
            reject(error);
            if (error?.response?.status === 401) {
              window.localStorage.removeItem("lnf_token");
              history.push("/login");
            }
            return;
          }
        );
      };
      reader.readAsDataURL(imageFile);
    });
  };

  const handleOnOpen = () => {
    axios
      .post(`/api/auth/isAdmin`, {
        token: localStorage.getItem("lnf_token"),
      })
      .then(
        (res) => {
          console.log(res);
          dispatch({ type: "OPEN_MODAL" });
        },
        (error) => {
          console.log(error);
          alert("Unable to create item");
          if (error?.response?.status === 401) {
            window.localStorage.removeItem("lnf_token");
            history.push("/login");
          } else if (error?.response?.status === 404) {
            history.push("/");
          }
        }
      );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      date,
      name,
      whereFound,
      description,
      building,
      image,
      imageObject,
      imagePermission,
      status,
      identification,
      notes,
    } = state;

    let error = false;

    if (building === "") {
      setBuildingError(true);
      error = true;
    } else {
      setBuildingError(false);
    }

    if (error) {
      setFormError(true);
      return;
    } else {
      setFormError(false);
    }

<<<<<<< HEAD
    const offset = date.getTimezoneOffset();
    let currentDate = new Date(date.getTime() - offset * 60 * 1000);
    const dateFound = currentDate.toISOString().slice(0, 10);
    const timeFound = currentDate.toISOString().slice(11, 16);
=======
    axios({
      method: 'POST',
      url: `https://api.mailgun.net/v3/scottylabs.org/messages`,
      auth: {
          username: 'api',
          password: 'key'
      },
      params: {
          from: 'Scotty Labs Lost and Found',
          to: 'michellejli7777@gmail.com',
          subject: 'New Item Added: Approval Needed',
          text: 'pls approve item'
      }
    }).then(
        response => {
            console.log(response)
        },
        reject => {
            console.log(reject)
        }
    )
>>>>>>> c46fb36... Basic mailgun api call - no key

    uploadImage(imageObject).then(
      (res) => {
        axios
          .post(`/api/items/add`, {
            token: localStorage.getItem("lnf_token"),
            dateFound: dateFound,
            timeFound: timeFound,
            name: name,
            whereFound: whereFound,
            building: building,
            description: description,
            image: res,
            imagePermission: imagePermission,
            status: status,
            approved: props.isAdmin,
            publicDisplay: false,
            identification: identification,
            notes: notes,
          })
          .then(
            (res) => {
              console.log("Added");
              console.log(res);
              props.fetchItems();
            },
            (error) => {
              console.log(error);
              alert("Unable to create item");
              if (error?.response?.status === 401) {
                window.localStorage.removeItem("lnf_token");
                history.push("/login");
              } else if (error?.response?.status === 403) {
                history.push("/");
              }
            }
          );
        dispatch({ type: "CLOSE_MODAL" });
        setState({
          date: new Date(),
          name: "",
          whereFound: "",
          building: "",
          description: "",
          image: "",
          imageObject: null,
          imagePath: "",
          imagePermission: false,
          status: "available",
          identification: "",
          notes: "",
        });
        return res;
      },
      (err) => {
        console.error(err);
      }
    );
  };

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Modal
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          open={open}
          onOpen={handleOnOpen}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          trigger={
            <Button
              color="red"
              style={{ height: "47px", width: "110px", marginLeft: "2px" }}
            >
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
                <Form.Field required>
                  <label>Date and Time Found</label>
                  <DatePicker
                    selected={state.date}
                    name="date"
                    onChange={(date: Date) =>
                      setState({ ...state, ["date"]: date })
                    }
                    dateFormat="MM/dd/yyyy hh:mm aa"
                    maxDate={new Date()}
                    showTimeSelect
                    timeFormat="hh:mm aa"
                    timeIntervals={5}
                    timeCaption="Time"
                  />
                </Form.Field>
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
                label="Building (Lost and Found Desk)"
                options={buildings}
                placeholder="Building (Lost and Found Desk)"
                name="building"
                value={state.building}
                onChange={handleChange}
                error={buildingError}
              />
              <Form.Input
                label="Image Upload"
                name="imagePath"
                type="file"
                value={state.imagePath}
                onChange={handleFileChange}
              />
              <Form.Input
                label="Identification"
                placeholder="AndrewID or driver's license number"
                name="identification"
                value={state.identification}
                onChange={handleChange}
              />
              <Form.TextArea
                label="Notes"
                name="notes"
                value={state.notes}
                onChange={handleChange}
              />
              <Form.Group></Form.Group>
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
                    type="button"
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
