import React from 'react';
import { Form, Input } from "semantic-ui-react";
import "./SearchBar.css";

const SearchBar = (props: {input: string, onChange: Function}) => {
  return (
    <Form id="search">
      <Form.Field
        id="searchbar"
        control={Input}
        value={props.input}
        placeholder="Search..."
        onChange={(e: any) => props.onChange(e.target.value)}
        icon="search"
      />
    </Form>
  );
}

export default SearchBar