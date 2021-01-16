import React from "react";
import { Icon, Image, Modal, Button } from "semantic-ui-react";
import "./ImageModal.css";

export default function ImageModal (props: {
  image: string;
}) {
    const [open, setOpen] = React.useState(false)
    console.log(props.image);
    return (
    <div>
        <Button icon circular color='blue' size='tiny' onClick={() => {setOpen(true)}}>
            <Icon name="image outline" inverted size='large' ></Icon>
        </Button>
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}>
            <Modal.Content image>
                <Image size='medium' src={props.image} wrapped />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setOpen(false)}>Close</Button>
            </Modal.Actions>
        </Modal>
    </div>
  );
}