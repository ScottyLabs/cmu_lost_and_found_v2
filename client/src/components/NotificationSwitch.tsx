import React, { useState } from "react";
import Toggle from "react-toggle";
import axios from "axios";
import "./ApproveSwitch.css";
import { useHistory } from "react-router";

export default function NotificationSwitch(props: {
  username: string;
  notif: boolean;
  fetchUsers: Function;
}) {
  const history = useHistory();

  const handleClick = () => {
    console.log("inhandle")
    axios
      .post(`/api/accounts/updateNotif`, {
        token: localStorage.getItem("lnf_token"),
        username: "elouie2@andrew.cmu.edu",
        notif: !props.notif,
      })
      .then(
        (res) => {
          props.fetchUsers();
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

  return <Toggle disabled={false} checked={props.notif} onChange={handleClick} />;
}