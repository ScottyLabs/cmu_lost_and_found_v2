import * as React from "react";
import { Form, Input } from "semantic-ui-react";
import "./SearchBar.css";

const SearchBar = (props: {
  input: string;
  onChange: (input: string) => void;
  placeholder: string;
}) => {
  return (
    <Form id="search">
      <Form.Field
        id="searchbar"
        control={Input}
        value={props.input}
        placeholder={props.placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.onChange(e.target.value)
        }
        icon="search"
      />
    </Form>
  );
};

export default SearchBar;
