// TODO: #126 Replace any annotations with appropriate type
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
import { Item } from "../interface/item";
import { User } from "../interface/user";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";

import axios from "axios";
import * as React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import { Button, Grid, Modal, Form, Icon } from "semantic-ui-react";

import "react-datepicker/dist/react-datepicker.css";
import "./EditItem.css";

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

// const categories = [
//   { key: "clothing", text: "Clothing", value: "Clothing" },
//   { key: "headphones", text: "Headphones", value: "Headphones" },
//   { key: "jewelry", text: "Jewelry", value: "Jewelry" },
//   { key: "keys", text: "Keys", value: "Keys" },
//   { key: "laptops", text: "Laptops", value: "Laptops" },
//   { key: "phones", text: "Phones", value: "Phones" },
//   { key: "students ids", text: "Student IDs", value: "Student IDs" },
//   { key: "tablets", text: "Tablets", value: "Tablets" },
//   { key: "umbrellas", text: "Umbrellas", value: "Umbrellas" },
//   { key: "water bottles", text: "Water Bottles", value: "Water Bottles" },
//   {
//     key: "other electronics",
//     text: "Other Electronics",
//     value: "Other Electronics",
//   },
//   { key: "miscellaneous", text: "Miscellaneous", value: "Miscellaneous" },
// ];

// const pickup = [
//   {
//     key: "cohon",
//     text: "Cohon University Center",
//     value: "Cohon University Center",
//   },
//   {
//     key: "gates",
//     text: "GHC 6203, 412.268.8525, lostfound@cs.cmu.edu.",
//     value: "GHC 6203, 412.268.8525, lostfound@cs.cmu.edu.",
//   },
//   { key: "tepper", text: "Tepper Building", value: "Tepper Building" },
// ];

const buildings = Object.keys(BuildingType)
  .filter((value) => value !== "ALL")
  .map((key) => ({
    key,
    text: key,
    value: key,
  }));

function EditItem(props: {
  // TODO: #127 Replace bad Function type with appropriate type
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchItems: Function;
  user: User;
  item: Item;
  id: string;
  disabled: boolean;
}) {
  const [dispatchState, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = dispatchState;
  const history = useHistory();

  const [state, setState] = useState({
    date: new Date(
      new Date(props.item.dateFound).toISOString().substring(0, 10) +
        "T" +
        (props.item.timeFound.trim().length > 4
          ? props.item.timeFound.trim()
          : "0" + props.item.timeFound.trim())
    ),
    name: props.item.name,
    whereFound: props.item.whereFound,
    description: props.item.description,
    value: props.item.value,
    identifiable: props.item.identifiable,
    building: props.item.building,
    image: props.item.image,
    imagePath: "",
    imageObject: null as any,
    imagePermission: props.item.imagePermission,
    status: props.item.status,
    approved: props.item.approved,
    identification: props.item.identification,
    notes: props.item.notes,
  });

  const handleChange = (e: any, { name, value }: any) => {
    console.log(value);
    console.log(typeof value);
    console.log(name);
    setState({ ...state, [name]: value });
  };
  const handleRadioChange = (e: any, { name, value }: any) => {
    setState({ ...state, [name]: value === "true" });
  };
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: any
  ) => {
    console.log("handling file change");
    console.log(name + " " + value);
    setState({ ...state, [name]: value, imageObject: e?.target?.files?.[0] });
  };

  const uploadImage = (imageFile: File) => {
    console.log("attempting to edit image");
    const imageName = "test";
    console.log(imageFile);
    console.log(typeof imageFile);

    // no image, TODO: check
    if (!imageFile) {
      return new Promise((resolve, _reject) => {
        resolve("");
        return;
      });
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const data = {
          token: localStorage.getItem("lnf_token"),
          imageName: imageName,
          dataURL: reader.result,
        };
        console.log("Trying to edit image");

        axios.post("/api/items/addImage", data).then(
          (res) => {
            console.log("Image uploaded successfully");
            console.log(res);
            const finalURL = res.data.msg.fileId;
            console.log(
              "https://drive.google.com/uc?export=view&id=" + finalURL
            );
            resolve("https://drive.google.com/uc?export=view&id=" + finalURL);
            return;
          },
          (error) => {
            console.error(error);
            reject(error);
            if (error?.response?.status === 401) {
              window.localStorage.removeItem("lnf_token");
              history.push("/");
            } else if (error?.response?.status === 403) {
              history.push("/");
            }
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
      date,
      name,
      whereFound,
      building,
      description,
      value,
      identifiable,
      image,
      imageObject,
      imagePermission,
      status,
      approved,
      identification,
      notes,
    } = state;

    const offset = date.getTimezoneOffset();
    const currentDate = new Date(date.getTime() - offset * 60 * 1000);
    const dateFound = currentDate.toISOString().slice(0, 10);
    const timeFound = currentDate.toISOString().slice(11, 16);

    uploadImage(imageObject).then(
      (res) => {
        axios
          .post("/api/items/editItem", {
            id: props.id,
            token: localStorage.getItem("lnf_token"),
            dateFound: dateFound,
            timeFound: timeFound,
            whereFound: whereFound,
            name: name,
            building: building,
            description: description,
            value: value,
            identifiable: identifiable,
            image: res === "" ? image : res, // use existing image if no new image was added
            imagePermission: imagePermission,
            status: status,
            approved: approved,
            identification: identification,
            notes: notes,
          })
          .then(
            (res) => {
              console.log("Edited");
              console.log(res);
              props.fetchItems();
            },
            (error) => {
              console.log(error);
              alert("Unable to edit item");
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
          date: state.date,
          name: state.name,
          whereFound: state.whereFound,
          description: state.description,
          value: state.value,
          identifiable: state.identifiable,
          building: state.building,
          image: state.image,
          imageObject: state.imageObject,
          imagePath: state.imagePath,
          imagePermission: state.imagePermission,
          status: "available",
          approved: false,
          identification: state.identification,
          notes: state.notes,
        });
        return res;
      },
      (err) => {
        console.error(err);
        alert("Unable to edit item");
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
          onOpen={() => dispatch({ type: "OPEN_MODAL" })}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          trigger={
            <Button
              disabled={props.disabled}
              icon
              circular
              color="blue"
              size="tiny"
            >
              <Icon name="edit outline" inverted size="large"></Icon>
            </Button>
          }
        >
          <Modal.Header>Edit Item</Modal.Header>
          <Modal.Content>
            {/* Need to stop modal from closing when enter key is pressed */}
            <Form onSubmit={handleSubmit}>
              <Form.Input
                required
                fluid
                label="Item Name"
                placeholder="Item Name"
                name="name"
                value={state.name}
                onChange={handleChange}
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
                />
              </Form.Group>
              <Form.Input
                required
                label="Item Description"
                placeholder="Item Description"
                name="description"
                value={state.description}
                onChange={handleChange}
              />
              <Form.Group inline>
                <Form.Field required>
                  <label>Value</label>
                </Form.Field>
                <Form.Radio
                  label="General"
                  name="value"
                  value="general"
                  checked={state.value === "general"}
                  onChange={handleChange}
                />
                <Form.Radio
                  label="High Value"
                  name="value"
                  value="high value"
                  checked={state.value === "high value"}
                  onChange={handleChange}
                />
                <Form.Field required>
                  <label>Identifiable</label>
                </Form.Field>
                <Form.Radio
                  label="Yes"
                  name="identifiable"
                  value="true"
                  checked={state.identifiable}
                  onChange={handleRadioChange}
                />
                <Form.Radio
                  label="No"
                  name="identifiable"
                  value="false"
                  checked={!state.identifiable}
                  onChange={handleRadioChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  required
                  label="Building (Lost and Found Desk)"
                  options={buildings}
                  placeholder="Building (Lost and Found Desk)"
                  name="building"
                  value={state.building}
                  onChange={handleChange}
                />
              </Form.Group>
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
                    justifyContent: "flex-start",
                    textAlign: "right",
                    width: "100%",
                  }}
                >
                  <ArchiveButton
                    id={props.id}
                    fetchItems={props.fetchItems}
                    disabled={
                      props.item.approved &&
                      !props.user.permissions.some((value) =>
                        value.includes(PermissionType.ADMIN)
                      )
                    }
                  />
                  <div
                    style={{
                      width: "1rem",
                    }}
                  />
                  <DeleteButton
                    id={props.id}
                    fetchItems={props.fetchItems}
                    disabled={
                      props.item.approved &&
                      !props.user.permissions.some((value) =>
                        value.includes(PermissionType.ADMIN)
                      )
                    }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    textAlign: "right",
                    width: "100%",
                  }}
                >
                  <Button
                    type="button" // needs to be set because type="submit" is the default
                    onClick={() => {
                      dispatch({ type: "CLOSE_MODAL" });
                      setState({
                        date: new Date(
                          new Date(props.item.dateFound)
                            .toISOString()
                            .substring(0, 10) +
                            "T" +
                            (props.item.timeFound.trim().length > 4
                              ? props.item.timeFound.trim()
                              : "0" + props.item.timeFound.trim())
                        ),
                        name: props.item.name,
                        whereFound: props.item.whereFound,
                        description: props.item.description,
                        value: props.item.value,
                        identifiable: props.item.identifiable,
                        building: props.item.building,
                        image: props.item.image,
                        imagePath: "",
                        imageObject: null as any,
                        imagePermission: props.item.imagePermission,
                        status: props.item.status,
                        approved: props.item.approved,
                        identification: props.item.identification,
                        notes: props.item.notes,
                      });
                    }}
                    negative
                  >
                    Cancel
                  </Button>
                  {/* Need to close modal after validation of the form */}
                  <Button positive type="submit">
                    Edit
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

export default EditItem;
