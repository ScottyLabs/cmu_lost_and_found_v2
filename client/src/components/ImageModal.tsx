import React from "react";
import { Icon, Image, Modal, Button } from "semantic-ui-react";
import "./ImageModal.css";

export default function ImageModal(props: { image: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      {props.image === undefined || props.image === "" ? (
        <Button
          icon
          circular
          disabled
          color="blue"
          size="tiny"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Icon name="image outline" inverted size="large"></Icon>
        </Button>
      ) : (
        <Button
          icon
          circular
          color="blue"
          size="tiny"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Icon name="image outline" inverted size="large"></Icon>
        </Button>
      )}
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="small"
      >
        <Modal.Content image>
          <Image src={props.image} wrapped centered fluid />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}