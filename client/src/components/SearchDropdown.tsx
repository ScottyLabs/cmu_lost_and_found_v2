import "./SearchDropdown.css";
import React from "react";
import { Dropdown } from "semantic-ui-react";

const searchOptions = [
  {
    key: "Keyword",
    text: "Keyword",
    value: "Search by keyword",
  },
  {
    key: "Older than",
    text: "Items older than __ days",
    value: "Search oldest items by days",
  },
  {
    key: "Recency",
    text: "Items added within the last __ days",
    value: "Search recent items by days",
  },
];

const SearchDropdown = (props: { selected: string; onChange: Function }) => {
  return (
    <Dropdown
      id="searchdropdown"
      placeholder="Search by..."
      fluid
      selection
      value={props.selected}
      onChange={(e: any, data) => props.onChange(data.value)}
      options={searchOptions}
    />
  );
};

export default SearchDropdown;
