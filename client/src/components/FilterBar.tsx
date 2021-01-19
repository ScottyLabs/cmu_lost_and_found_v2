import React from "react";
import { Form, Input, Button, Select } from "semantic-ui-react";
import "./FilterBar.css";

const categoryOptions = [
  { key: "clothing", text: "Clothing", value: "clothing" },
  { key: "headphones", text: "Headphones", value: "headphones" },
  { key: "jewelry", text: "Jewelry", value: "jewelry" },
  { key: "keys", text: "Keys", value: "keys" },
  { key: "laptops", text: "Laptops", value: "laptops" },
  { key: "phones", text: "Phones", value: "phones" },
  { key: "students ids", text: "Student IDs", value: "students ids" },
  { key: "tablets", text: "Tablets", value: "tablets" },
  { key: "umbrellas", text: "Umbrellas", value: "umbrellas" },
  { key: "water bottles", text: "Water Bottles", value: "water bottles" },
  { key: "other electronics", text: "Other Electronics", value: "other electronics" },
  { key: "miscellaneous", text: "Miscellaneous", value: "miscellaneous" },
];

const FilterBar = () => (
  <Form>
    <Form.Group>
      <Form.Field
        id="form-searchbar"
        control={Input}
        placeholder="Search Items"
      />
      <Form.Field
        id="form-category"
        fluid
        control={Select}
        options={categoryOptions}
        placeholder="Category"
        search
      />
      <Form.Field
        id="form-search"
        control={Button}
        icon='search'
        type='submit'
      />
    </Form.Group>
    {/* <Form.Field
      id="form-button-control-advanced-settings"
      control={Button}
      content="Advanced Search"
    /> */}
  </Form>
);

export default FilterBar;
