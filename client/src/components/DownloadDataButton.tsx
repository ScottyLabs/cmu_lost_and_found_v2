import axios from "axios";
import React, { useState } from "react";
import { Button, Grid, Modal, Form, Message } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DownloadDataButton.css";
import { BuildingType } from "../enums/locationTypes";
import { User } from "../interface/user";
import emailbody from "../templates/html/emailbody";
import { PermissionType } from "../enums/permissionType";
import { TemplateType } from "../enums/templateTypes";
import { UseTemplate } from "../templates/emailTemplates";

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

function DownloadDataButton(props: { fetchItems: Function; isAdmin: boolean }) {
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
    value: "general",
    identifiable: false,
    building: "",
    image: "",
    imagePath: "",
    imageObject: null as any,
    imagePermission: false,
    status: "available",
    identification: "",
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
  const [buildingError, setBuildingError] = useState(false);
  const [formError, setFormError] = useState(false);

  const history = useHistory();

  const handleChange = (e: any, { name, value }: any) => {
    setState({ ...state, [name]: value });
  };
  const handleRadioChange = (e: any, { name, value }: any) => {
    setState({ ...state, [name]: value === "true" });
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
      value,
      identifiable,
      building,
      image,
      imageObject,
      imagePermission,
      status,
      identification,
      email,
      templateType,
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

    // if user, send notifcation to admins with notifs on
    if (!props.isAdmin) {
      // get list of all users
      axios
        .post(`/api/accounts/all`, { token: localStorage.getItem("lnf_token") })
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
      console.log("Template:", emailTemplate, "\nSent to:", email)
      const singleton = [email];
      
      let data = {
        emails: singleton,
        subject:
          "Lost and Found: Your item has been found",
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
      let emails: string[] = [];
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
        let subheaderTitle = "A New Item Has Been Added For Approval";
        let subheaderContent = `<b>Item Name:</b> ${String(
          name
        )}<br><b>Item Description:</b> ${String(description)}
        <br><b>Item Value:</b> ${String(
          value.charAt(0).toUpperCase() + value.slice(1)
        )}<br><b>Building:</b> ${String(
          building
        )}<br>Visit the <a href=https://lostandfound.andrew.cmu.edu/admin>CMU Lost and Found site</a> to approve.`;
        let data = {
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
    let currentDate = new Date(date.getTime() - offset * 60 * 1000);
    const dateFound = currentDate.toISOString().slice(0, 10);
    const timeFound = currentDate.toISOString().slice(11, 16);

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
            value: value,
            identifiable: identifiable,
            image: res,
            imagePermission: imagePermission,
            status: status,
            approved: props.isAdmin,
            identification: identification,
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
          building: "",
          description: "",
          value: "general",
          identifiable: false,
          image: "",
          imageObject: null,
          imagePath: "",
          imagePermission: false,
          status: "available",
          identification: "",
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

  const printy = () => {
    console.log("bruh");
  };
  
  return (
    <Grid columns={1}>
      <Grid.Column>
            <Button
              color="red"
              style={{ height: "47px", width: "110px", marginLeft: "2px" }}
              onClick={printy}
            >
              Download Data
            </Button>
        {/* <Modal
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
              Download Data
            </Button>
          }
        >
          <Modal.Header>BBB</Modal.Header>
          <Modal.Content>
          </Modal.Content>
        </Modal> */}
      </Grid.Column>
    </Grid>
  );
}

export default DownloadDataButton;
