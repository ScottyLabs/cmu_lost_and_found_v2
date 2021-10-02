import React, { useState } from "react";
import Toggle from "react-toggle";
import axios from "axios";
import "./ApproveSwitch.css";
import { useHistory } from "react-router";

// Admin-side public display/not public display button that sets backend public display status to true/false
export default function PublicDisplaySwitch(props: {
  id: string;
  isPublicDisplay: boolean;
  disabled: boolean;
  fetchItems: Function;
}) {
  const history = useHistory();
  const [state, setState] = useState({
    isPublicDisplay: props.isPublicDisplay,
  });

  const handleClick = () => {
    const { isPublicDisplay } = state;
    axios
      .post(`/api/items/updatePublicDisplayStatus`, {
        token: localStorage.getItem("lnf_token"),
        id: props.id,
        publicDisplay: !isPublicDisplay,
      })
      .then(
        (res) => {
          props.fetchItems();
          setState({ isPublicDisplay: !isPublicDisplay });
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

  return <Toggle disabled={props.disabled} defaultChecked={state.isPublicDisplay} onChange={handleClick} />;
}
