import { SearchConfig } from "../utils/itemTableUtils";

import * as React from "react";
import { Form, Input } from "semantic-ui-react";
import "./SearchBar.css";

const SearchBar = (props: {
  value: SearchConfig;
  onChange: React.Dispatch<React.SetStateAction<SearchConfig>>;
  placeholder: string;
}) => {
  return (
    <Form id="search">
      <Form.Field
        id="searchbar"
        control={Input}
        value={props.value.value}
        placeholder={props.placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.onChange({ ...props.value, value: e.target.value })
        }
        icon="search"
      />
    </Form>
  );
};

export default SearchBar;
