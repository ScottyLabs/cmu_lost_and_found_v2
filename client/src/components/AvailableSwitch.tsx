import React, { useState } from "react";
import Toggle from "react-toggle";
import axios from "axios";
import { useHistory } from "react-router";
import "./ApproveSwitch.css";

// admin-side switch that sets the backend status field to available/unavailable
export default function AvailableSwitch(props: {
  id: string;
  isAvailable: boolean;
  disabled: boolean;
  fetchItems: Function;
}) {
  const history = useHistory();
  const [state, setState] = useState({
    isAvailable: props.isAvailable,
  });

  const handleClick = () => {
    const { isAvailable } = state;
    axios
      .post(`/api/items/updateStatus`, {
        token: localStorage.getItem("lnf_token"),
        id: props.id,
        status: !isAvailable ? "available" : "claimed", // Indicates whether it was formerly available. If so, then it should no longer be available.
      })
      .then(
        (res) => {
          props.fetchItems();
          if (isAvailable) {
            axios
              .post(`/api/items/updatePublicDisplayStatus`, {
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

  return <Toggle disabled={props.disabled} checked={state.isAvailable} onChange={handleClick} />;
}
