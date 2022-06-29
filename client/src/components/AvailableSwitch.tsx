import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import Toggle from "react-toggle";
import "./ApproveSwitch.css";

// Admin-side claim/unclaim button that sets backend claim status to claimed/unclaimed
export default function AvailableSwitch(props: {
  id: string;
  isAvailable: boolean;
  disabled: boolean;
  // TODO: #133 Replace bad Function type with appropriate type
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchItems: Function;
}) {
  const history = useHistory();
  const [state, setState] = useState({
    isAvailable: props.isAvailable,
  });

  const handleClick = () => {
    const { isAvailable } = state;
    axios
      .post("/api/items/updateStatus", {
        token: localStorage.getItem("lnf_token"),
        id: props.id,
        status: !isAvailable ? "available" : "claimed", // isAvailable indicates whether it was formerly available. If it was previously available, then it should no longer be available
      })
      .then(
        (res) => {
          props.fetchItems();
          if (isAvailable) {
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
          setState({ isAvailable: !isAvailable });
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
      checked={state.isAvailable}
      onChange={handleClick}
    />
  );
}
