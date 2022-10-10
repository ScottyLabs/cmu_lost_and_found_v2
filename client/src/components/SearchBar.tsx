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
        //item.whereFound

        // TODO: #115 Replace any with appropriate type: React.ChangeEvent<HTMLInputElement>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e: any) => props.onChange(e.target.value)}
        icon="search"
      />
    </Form>
  );
};

export default SearchBar;
