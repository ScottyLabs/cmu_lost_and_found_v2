// import React, { useState } from 'react';
// import axios from "axios";
// import { Icon, Button } from "semantic-ui-react";

// // Admin-side claim/unclaim button that sets backend claim status to claimed/unclaimed
// export default function SwitchButton(props: {
//   id: string;
//   disabled: boolean;
//   isClaimed: boolean;
//   fetchItems: Function
// }) {

//   const [state, setState] = useState({
//     isClaimed: props.isClaimed
//   });

//   const handleClick = () => {
//     const { isClaimed } = state;
//     axios
//       .post(`/api/items/updateStatus`, { token: localStorage.getItem("lnf_token"), id: props.id, status: isClaimed ? "available" : "claimed" })
//       .then(
//         (res) => {
//           props.fetchItems();
//           setState({ isClaimed: !isClaimed });
//           console.log(res)
//         },
//         (error) => {
//           console.error(error);
//         }
//       );
//   }

//   return (
//     props.disabled ?
//       (state.isClaimed ?
//         <Button
//           icon
//           circular
//           color="red"
//           size="tiny"
//           disabled
//           onClick={handleClick}
//         >
//           <Icon name="x" inverted size="large"></Icon>
//         </Button> :
//         <Button
//           icon
//           circular
//           color="green"
//           size="tiny"
//           disabled
//           onClick={handleClick}
//         >
//           <Icon name="check" inverted size="large"></Icon>
//         </Button>) : (state.isClaimed ?
//           <Button
//             icon
//             circular
//             color="red"
//             size="tiny"
//             onClick={handleClick}
//           >
//             <Icon name="x" inverted size="large"></Icon>
//           </Button> :
//           <Button
//             icon
//             circular
//             color="green"
//             size="tiny"
//             onClick={handleClick}
//           >
//             <Icon name="check" inverted size="large"></Icon>
//           </Button>)
//   );
// }
export default {};
