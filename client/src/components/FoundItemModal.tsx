import axios from "axios";
import React, { useState } from "react";
import { Button, Grid, Modal, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

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

  let locations = [
    "Gates Hillman 6203",
    `Lost and Found desk in the University Center`,
    `Lost and Found desk in Residence on Fifth
  `,
    `Lost and Found desk in Morewood E-tower`,
    `Lost and Found desk in Donner`,
  ];

  const listItems = locations.map((d) => (
    <li className="location" key={d}>
      {d}
    </li>
  ));

function FoundItemModal(props: {
  style?: any;
}) {
  const [dispatchState, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = dispatchState;


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


  return (
    <Grid columns={1}>
      <Grid.Column>
        <Modal
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          open={open}
          onOpen={() => dispatch({ type: "OPEN_MODAL" })}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
          trigger={<Button style={props.style}>Found an item</Button>}
        >
          <Modal.Header>Found an item</Modal.Header>
          <Modal.Content>
            {/* Need to stop modal from closing when enter key is pressed */}
            <p>
              If you find a lost item, please take it to one of the following
              locations:
            </p>
            <ul>{listItems}</ul>
            <p>
              If you have any inquiries, please send an email to{" "}
              <a href="mailto:lostfound@cs.cmu.edu">lostfound@cs.cmu.edu</a>.
            </p>
            <Button onClick={() => dispatch({ type: "CLOSE_MODAL" })} negative>
              OK
            </Button>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  );
}

export default FoundItemModal;
