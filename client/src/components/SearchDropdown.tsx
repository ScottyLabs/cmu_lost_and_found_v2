import "./SearchDropdown.css";

import { SearchConfig } from "../utils/itemTableUtils";

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
  onChange: React.Dispatch<React.SetStateAction<SearchConfig>>;
  value: SearchConfig;
}) => {
  const searchOption = searchOptions.find(
    (option) => option.key === props.value.setting
  );
  return (
    <Dropdown
      id="searchdropdown"
      placeholder="Search by..."
      fluid
      selection
      value={searchOption?.value ?? searchOptions[0].value}
      onChange={(_e, data) => {
        const option = searchOptions.find(
          (option) => option.value === String(data.value)
        );
        props.onChange({
          ...props.value,
          setting: option?.key ?? "Keyword",
          placeholder: option?.value ?? "e.g. keys",
        });
      }}
      options={searchOptions}
    />
  );
};

export default SearchDropdown;
