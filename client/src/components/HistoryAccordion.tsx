import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import "./HistoryAccordion.css";

export default function HistoryAccordion(props: { modified: string[] }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <Accordion fluid styled>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        Modified by
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        {props.modified.slice(0).reverse().map((username) => (
          <p>{username}</p>
        ))}
      </Accordion.Content>
    </Accordion>
  );
}
