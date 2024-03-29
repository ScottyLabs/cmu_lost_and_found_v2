import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import Toggle from "react-toggle";
import "./ApproveSwitch.css";

// Admin-side claim/unclaim button that sets backend claim status to claimed/unclaimed
export default function ApproveSwitch(props: {
  id: string;
  isApproved: boolean;
  // TODO: #134 Replace bad Function type with appropriate type
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchItems: Function;
  disabled: boolean;
}) {
  const history = useHistory();
  const [state, setState] = useState({
    isApproved: props.isApproved,
  });

  const handleClick = () => {
    const { isApproved } = state;
    axios
      .post("/api/items/updateApprovedStatus", {
        token: localStorage.getItem("lnf_token"),
        id: props.id,
        approved: !isApproved,
      })
      .then(
        (res) => {
          props.fetchItems();
          if (isApproved) {
            axios
              .post("/api/items/updatePublicDisplayStatus", {
                token: localStorage.getItem("lnf_token"),
                id: props.id,
                publicDisplay: false,
              })
              .then(
                (res) => {
                  props.fetchItems();
                  console.log(res);
                },
                (error) => {
                  console.error(error);
                  if (error?.response?.status === 401) {
                    window.localStorage.removeItem("lnf_token");
                    history.push("/login");
                  } else if (error?.response?.status === 403) {
                    history.push("/");
                  }
                }
              );
          }
          setState({ isApproved: !isApproved });
          console.log(res);
        },
        (error) => {
          console.error(error);
          if (error?.response?.status === 401) {
            window.localStorage.removeItem("lnf_token");
            history.push("/login");
          } else if (error?.response?.status === 403) {
            history.push("/");
          }
        }
      );
  };

  return (
    <Toggle
      disabled={props.disabled}
      checked={state.isApproved}
      onChange={handleClick}
    />
  );
}
