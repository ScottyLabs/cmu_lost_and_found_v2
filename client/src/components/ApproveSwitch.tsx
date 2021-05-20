import React, { useState } from 'react';
import Toggle from 'react-toggle';
import axios from "axios";
import "./ApproveSwitch.css"

// Admin-side claim/unclaim button that sets backend claim status to claimed/unclaimed
export default function ApproveSwitch(props: {
  id: string;
  isApproved: boolean;
  fetchItems: Function
}) {

  const [state, setState] = useState({
    isApproved: props.isApproved
  });

  const handleClick = () => {
    const { isApproved } = state;
    axios
      .post(`/api/items/updateApprovedStatus`, { id: props.id, approved: !isApproved })
      .then(
        (res) => {
          props.fetchItems();
          setState({ isApproved: !isApproved });
          console.log(res)
        },
        (error) => {
          console.error(error);
        }
      );
  }

  return (
    <Toggle defaultChecked={state.isApproved} onChange={handleClick} />
  );
}
