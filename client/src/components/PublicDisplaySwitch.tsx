import axios from "axios";
import * as React from "react";
import { useHistory } from "react-router";
import Toggle from "react-toggle";
import "./ApproveSwitch.css";

// Admin-side public display/not public display button that sets backend public display status to true/false
export default function PublicDisplaySwitch(props: {
  id: string;
  isPublicDisplay: boolean;
  disabled: boolean;
  // TODO: #116 Replace bad Function type with appropriate type
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchItems: Function;
}) {
  const history = useHistory();

  const handleClick = () => {
    axios
      .post("/api/items/updatePublicDisplayStatus", {
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

  return (
    <Toggle
      disabled={props.disabled}
      checked={props.isPublicDisplay}
      onChange={handleClick}
    />
  );
}
