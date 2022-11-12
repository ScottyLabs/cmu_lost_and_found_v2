import "./SearchDropdown.css";

import * as React from "react";
import { Dropdown } from "semantic-ui-react";

const searchOptions = [
  {
    key: "Keyword",
    text: "Keyword",
    value: "e.g. keys",
  },
  {
    key: "Older than",
    text: "Items older than __ days",
    value: "e.g. 90",
  },
  {
    key: "Recency",
    text: "Items added within the last __ days",
    value: "e.g. 10",
  },
];

const SearchDropdown = (props: {
  selected: string;
  onChange: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <Dropdown
      id="searchdropdown"
      placeholder="Search by..."
      fluid
      selection
      value={props.selected}
      onChange={(e, data) => {
        props.onChange(
          searchOptions.find((option) => option.value == String(data.value)) ??
            searchOptions[0]
        );
      }}
      options={searchOptions}
    />
  );
};

export default SearchDropdown;
