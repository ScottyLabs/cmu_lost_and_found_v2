import React, { useState } from "react";
import { Button } from "semantic-ui-react";

// Admin-side claim button that sets backend claim status to true
function ClaimButton(props: any) {
    return <Button onClick={() => console.log("Claimed!")}>Claim</Button>
}

export default ClaimButton;