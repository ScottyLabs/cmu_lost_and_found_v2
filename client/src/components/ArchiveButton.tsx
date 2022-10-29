/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, Modal, Icon } from "semantic-ui-react";

type Props = {
  id: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchItems: Function;
  disabled: boolean;
};

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

const ArchiveButton: React.FC<Props> = ({ id, fetchItems, disabled }) => {
  const [dispatchState, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: false,
    closeOnDimmerClick: false,
    open: false,
    dimmer: undefined,
  });
  const { open, closeOnEscape, closeOnDimmerClick } = dispatchState;

  const history = useHistory();

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
              disabled={disabled}
              icon
              circular
              size="tiny"
              type="button"
              floated="left"
              color="yellow"
            >
              <Icon name="archive" inverted size="large" />
            </Button>
          }
        >
          <Modal.Header>Archive Item</Modal.Header>
          <Modal.Content
            style={{
              margin: "auto",
              maxWidth: "100%",
              padding: "20px 20px 50px 20px",
              fontSize: "18px",
            }}
          >
            {/* Need to stop modal from closing when enter key is pressed */}
            <p>Are you sure you wish to archive this item?</p>
            <Button
              onClick={() => {
                axios
                  .post("/api/items/archive", {
                    token: localStorage.getItem("lnf_token"),
                    ids: [id],
                    archived: true,
                  })
                  .then(
                    (res) => {
                      console.log("Archived!");
                      console.log(res);
                      fetchItems();
                    },
                    (error) => {
                      console.log(error);
                      alert("Unable to archive item");

                      if (error?.response?.status === 401) {
                        window.localStorage.removeItem("lnf_token");
                        history.push("/login");
                      }
                    }
                  );
                dispatch({ type: "CLOSE_MODAL" });
              }}
              positive
              floated="right"
            >
              Yes
            </Button>
            <Button
              onClick={() => dispatch({ type: "CLOSE_MODAL" })}
              negative
              floated="right"
            >
              Cancel
            </Button>
          </Modal.Content>
        </Modal>
      </Grid.Column>
    </Grid>
  );
};

export default ArchiveButton;
