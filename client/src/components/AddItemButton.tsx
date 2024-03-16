// TODO: #141 Replace any with appropriate type annotations
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./AddItemButton.css";
import { BuildingType } from "../enums/locationTypes";
import { PermissionType } from "../enums/permissionType";
// import { TemplateType } from "../enums/templateTypes";
import { User } from "../interface/user";
import { UseTemplate } from "../templates/emailTemplates";
import emailbody from "../templates/html/emailbody";

import axios from "axios";
import * as React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import { Button, Modal, Form, Message } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";

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

// const buildings = Object.keys(BuildingType)
//   .filter((value) => value !== "ALL")
//   .map((key) => ({
//     key,
//     text: key,
//     value: key,
//   }));

// const templates = Object.keys(TemplateType)
//   .filter((value) => value !== "ALL")
//   .map((key) => ({
//     key,
//     text: key,
//     value: key,
//   }));

// const emailValidatorRegex =
//   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Source: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

// const isValidEmail = (email: string) => {
//   return String(email).toLowerCase().match(emailValidatorRegex);
// };

function AddItemButton(props: {
  // TODO: #140 Replace Function with appropriate type
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchItems: Function;
  isAdmin: boolean;
  permissions: string[];
}) {
  const [dispatchState, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = dispatchState;

  const buildplace = () => {
    //determine location of user
    const build = props.permissions[0].split(":")[0];
    if (build == "ALL") return "";
    else return build; //returns building permission
  };

  const [state, setState] = useState({
    date: new Date(),
    name: "",
    whereFound: "",
    description: "",
    value: "general",
    identifiable: false,
    building: "CUC",
    image: "",
    imagePath: "",
    imageObject: null as any,
    imagePermission: false,
    status: "available",
    identification: "",
    ownerNotified: "",
    itemLocation: "",
    email: "",
    templateType: "",
    notes: "",
  });

  // Validation error states
  // const[nameError, setNameError] = useState(false);
  // const[dateError, setDateError] = useState(false);
  // const[timeError, setTimeError] = useState(false);
  // const[locationError, setLocationError] = useState(false);
  // const[descriptionError, setDescriptionError] = useState(false);
  // const [buildingError, setBuildingError] = useState(false);
  const [formError, setFormError] = useState(false);

  const history = useHistory();

  const handleChange = (e: any, { name, value }: any) => {
    setState({ ...state, [name]: value });
  };
  const handleRadioChange = (e: any, { name, value }: any) => {
    setState({ ...state, [name]: value === "true" });
  };
  // const handleFileChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   { name, value }: any
  // ) => {
  //   setState({ ...state, [name]: value, imageObject: e?.target?.files?.[0] });
  // };

  const uploadImage = (imageFile: File) => {
    const imageName = "test";

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
          imageName: imageName,
          dataURL: reader.result,
          token: localStorage.getItem("lnf_token"),
        };

        axios.post("/api/items/addImage", data).then(
          (res) => {
            console.log("Image uploaded successfully");
            console.log(res);
            const finalID = res.data.msg.fileId;
            const finalURL =
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
      .post("/api/auth/isAdmin", {
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
      value,
      identifiable,
      building,
      imageObject,
      imagePermission,
      status,
      identification,
      ownerNotified,
      itemLocation,
      email,
      templateType,
      notes,
    } = state;

    let error = false;

    // if (building === "") {
    //   setBuildingError(true);
    //   error = true;
    // } else {
    //   setBuildingError(false);
    // }

    if (error) {
      setFormError(true);
      return;
    } else {
      setFormError(false);
    }

    // if user, send notifcation to admins with notifs on
    if (!props.isAdmin) {
      // get list of all users
      axios
        .post("/api/accounts/all", { token: localStorage.getItem("lnf_token") })
        .then(
          (res) => {
            console.log("Retrieved users!");
            console.log(res);
            sendEmails(res.data);
          },
          (error) => {
            console.log(error);
            if (error?.response?.status === 401) {
              window.localStorage.removeItem("lnf_token");
              history.push("/login");
            } else if (error?.response?.status === 403) {
              history.push("/");
            }
          }
        );
    }

    const lostItemEmail = () => {
      const emailTemplate = templateType + "-" + building;
      console.log("Template:", emailTemplate, "\nSent to:", email);
      const singleton = [email];
      const data = {
        emails: singleton,
        subject: "Lost and Found: Your item has been found",
        text: emailbody
          .replace("{subheader_title}", "Hello,")
          .replace("{subheader_content}", UseTemplate(templateType, building)),
      };

      console.log(data);

      if (email.length > 0 && templateType != "" && building != "") {
        axios.post("/api/email/sendEmail", data).then(
          (res) => {
            console.log("Email sent!");
            console.log(res);
          },
          (error) => {
            console.log(error.response.data);
          }
        );
      }
    };

    if (email != "") {
      lostItemEmail();
    }

    const sendEmails = (userList: User[]) => {
      // filter user list to find admins with notifs
      const emails: string[] = [];
      userList.forEach((user: User) => {
        if (
          user.notif &&
          (user.permissions.includes(
            `${BuildingType.ALL}:${PermissionType.ADMIN}`
          ) ||
            user.permissions.includes(`${building}:${PermissionType.ADMIN}`))
        )
          emails.push(user.username);
      });

      // send emails to admins with notifs on
      if (emails.length > 0) {
        const subheaderTitle = "A New Item Has Been Added For Approval";
        const subheaderContent = `<b>Item Name:</b> ${String(
          name
        )}<br><b>Item Description:</b> ${String(description)}
        <br><b>Item Value:</b> ${String(
          value.charAt(0).toUpperCase() + value.slice(1)
        )}<br><b>Building:</b> ${String(
          building
        )}<br>Visit the <a href=https://lostandfound.andrew.cmu.edu/active>CMU Lost and Found site</a> to approve.`;
        const data = {
          emails: emails,
          subject:
            "New Item Added: Approval Needed" +
            (value === "high value" ? " - HIGH VALUE" : ""),
          text: emailbody
            .replace("{subheader_title}", subheaderTitle)
            .replace("{subheader_content}", subheaderContent),
        };

        axios.post("/api/email/sendEmail", data).then(
          (res) => {
            console.log("Emails sent!");
            console.log(res);
          },
          (error) => {
            console.log(error.response.data);
          }
        );
      }
    };
    const offset = date.getTimezoneOffset();
    const currentDate = new Date(date.getTime() - offset * 60 * 1000);
    const dateFound = currentDate.toISOString().slice(0, 10);
    const timeFound = currentDate.toISOString().slice(11, 16);

    uploadImage(imageObject).then(
      (res) => {
        axios
          .post("/api/items/add", {
            token: localStorage.getItem("lnf_token"),
            dateFound: dateFound,
            timeFound: timeFound,
            name: name,
            whereFound: whereFound,
            building: building,
            description: description,
            value: value,
            identifiable: identifiable,
            image: res,
            imagePermission: imagePermission,
            status: status,
            approved: props.isAdmin,
            identification: identification,
            ownerNotified: ownerNotified,
            itemLocation: itemLocation,
            email: email,
            templateType: templateType,
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
          building: buildplace(),
          description: "",
          value: "general",
          identifiable: false,
          image: "",
          imageObject: null,
          imagePath: "",
          imagePermission: false,
          status: "available",
          identification: "",
          ownerNotified: "",
          itemLocation: "",
          email: "",
          templateType: "",
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
    <Modal
      closeOnEscape={closeOnEscape}
      closeOnDimmerClick={closeOnDimmerClick}
      open={open}
      onOpen={handleOnOpen}
      onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      trigger={
        <Button color="black" style={{ height: "47px", width: "110px" }}>
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
          {/* <Form.Select
            fluid
            required
            label="Building (Lost and Found Desk)"
            options={buildings}
            placeholder={"Building (Lost and Found Desk)"}
            name="building"
            value={state.building}
            onChange={handleChange}
            error={buildingError}
          /> */}
          {/* <Form.Input
            label="Image Upload"
            name="imagePath"
            type="file"
            value={state.imagePath}
            onChange={handleFileChange}
          /> */}
          {state.identifiable ? (
            <Form.Group widths="equal">
              <Form.Input
                required
                label="Identification"
                placeholder="AndrewID or driver's license number"
                name="identification"
                value={state.identification}
                onChange={handleChange}
              />
              <Form.Input
                required
                fluid
                label="Owner Notified"
                name="ownerNotified"
                placeholder="Ex. Yes - emailed, No, N/A, etc."
                value={state.ownerNotified}
                onChange={handleChange}
              />
            </Form.Group>
          ) : null}
          <Form.Input
            required
            label="Item Storage Location"
            placeholder="Ex. Closet or Vault"
            name="itemLocation"
            value={state.itemLocation}
            onChange={handleChange}
          />
          <Form.TextArea
            label="Private Notes"
            name="notes"
            placeholder="Description typed here is not visible to the public"
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
              <Button positive type="submit" style={{ marginLeft: "10px" }}>
                Add
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default AddItemButton;
