import * as React from "react";
import { Form, Input } from "semantic-ui-react";
import "./SearchBar.css";

// TODO: #114 Replace Function annotation with appropriate type
// eslint-disable-next-line @typescript-eslint/ban-types
const SearchBar = (props: { input: string; onChange: Function }) => {
  return (
    <Form id="search">
      <Form.Field
        id="searchbar"
        control={Input}
        value={props.input}
        placeholder="Search..."
        //item.whereFound

        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.onChange(e.target.value)
        }
        icon="search"
      />
    </Form>
  );
};

export default SearchBar;
