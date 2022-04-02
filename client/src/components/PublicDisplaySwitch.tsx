import React from "react";
import Toggle from "react-toggle";
import axios from "axios";
import "./ApproveSwitch.css";
import { useHistory } from "react-router";

// admin-side switch that sets backend public display field to true/false
export default function PublicDisplaySwitch(props: {
  id: string;
  isPublicDisplay: boolean;
  disabled: boolean;
  fetchItems: Function;
}) {
  const history = useHistory();

  const handleClick = () => {
    axios
      .post(`/api/items/updatePublicDisplayStatus`, {
        token: localStorage.getItem("lnf_token"),
        id: props.id,
        publicDisplay: !props.isPublicDisplay,
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
  };

  return <Toggle disabled={props.disabled} checked={props.isPublicDisplay} onChange={handleClick} />;
}
