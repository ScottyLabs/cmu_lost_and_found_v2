import React, { useState } from "react";
import { Button } from "semantic-ui-react";

// Admin-side claim button that sets backend claim status to true
function UnclaimButton(props: any) {
    return <Button onClick={() => console.log("Unclaimed!")}>Unclaim</Button>
}

export default UnclaimButton;