import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

function ButtonExampleToggle (props:{
    isAdmin: boolean;
    isOwner: boolean
}) {
  const [active, setActive] = useState(false);
  const handleClick = () => setActive(!active)

  return (
    <Button toggle active={active} onClick={handleClick}>
      {props.isAdmin ? "Change Admin Status" : "Change Owner Status"}
    </Button>
  )
  
}

export default ButtonExampleToggle
