import React, { useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import "./HistoryAccordion.css";

export default function HistoryAccordion(props: {
  modified: string[];
  approver: string;
  returner: string;
}) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const modified = props.modified
    .filter((x) => x)
    .reverse()
    .map((username) => <p>{username}</p>);

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
      {modified.length > 0 && (
        <Accordion.Content active={activeIndex === 0}>
          {modified}
        </Accordion.Content>
      )}
      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        Approver
      </Accordion.Title>
      {props.approver !== null && (
        <Accordion.Content active={activeIndex === 1}>
          {props.approver}
        </Accordion.Content>
      )}
      <Accordion.Title
        active={activeIndex === 2}
        index={2}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        Returner
      </Accordion.Title>
      {props.returner !== null && (
        <Accordion.Content active={activeIndex === 2}>
          {props.returner}
        </Accordion.Content>
      )}
    </Accordion>
  );
}
