import React, { useState } from "react";
import Toggle from "react-toggle";
import axios from "axios";
import "./ApproveSwitch.css";

// Admin-side claim/unclaim button that sets backend claim status to claimed/unclaimed
export default function AvailableSwitch(props: {
  id: string;
  isAvailable: boolean;
  disabled: boolean;
  fetchItems: Function;
}) {
  const [state, setState] = useState({
    isAvailable: props.isAvailable,
  });

  const handleClick = () => {
    const { isAvailable } = state;
    axios
      .post(`/api/items/updateStatus`, {
        token: localStorage.getItem("lnf_token"),
        id: props.id,
        status: isAvailable ? "available" : "claimed",
      })
      .then(
        (res) => {
          props.fetchItems();
          setState({ isAvailable: !isAvailable });
          console.log(res);
        },
        (error) => {
          console.error(error);
        }
      );
  };

  return <Toggle disabled={props.disabled} defaultChecked={state.isAvailable} onChange={handleClick} />;
}
