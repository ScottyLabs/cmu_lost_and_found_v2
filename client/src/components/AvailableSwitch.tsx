import React, { useState } from "react";
import Toggle from "react-toggle";
import axios from "axios";
import "./ApproveSwitch.css";
import { useHistory } from "react-router";

// Admin-side claim/unclaim button that sets backend claim status to claimed/unclaimed
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
        status: !isAvailable ? "available" : "claimed", // isAvailable indicates whether it was formerly available. If it was previously available, then it should no longer be available
      })
      .then(
        (res) => {
          props.fetchItems();
          setState({ isAvailable: !isAvailable });
          console.log(res);
        },
        (error) => {
          console.error(error);
          if (error?.response?.status === 401) {
            window.localStorage.removeItem("lnf_token");
            history.push("/login");
          } else if (error?.response?.status === 403) {
            window.localStorage.setItem("lnf_isAdmin", "false");
            history.push("/");
          }
        }
      );
  };

  return <Toggle disabled={props.disabled} defaultChecked={state.isAvailable} onChange={handleClick} />;
}
