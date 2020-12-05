import React from "react";
import { Form, Input, Button, Select } from "semantic-ui-react";

const categoryOptions = [
  { key: "c", text: "Clothing", value: "clothing" },
  { key: "e", text: "Earbuds", value: "earbuds" },
  { key: "h", text: "Headphones", value: "headphones" },
  { key: "j", text: "Jewelry", value: "jewelry" },
  { key: "k", text: "Keys", value: "keys" },
  { key: "l", text: "Laptops", value: "laptops" },
  { key: "p", text: "Phones", value: "phones" },
  { key: "s", text: "Student IDs", value: "students ids" },
  { key: "u", text: "Umbrellas", value: "umbrellas" },
  { key: "w", text: "Water Bottles", value: "water bottles" },
  { key: "m", text: "Miscellaneous", value: "miscellaneous" },
];

const FilterBar = () => (
  <Form>
    <Form.Group>
      <Form.Field
        width={6}
        id="form-input-control-search"
        control={Input}
        placeholder="Search Items"
      />
      <Form.Field
        width={4}
        control={Select}
        options={categoryOptions}
        placeholder="Category"
        search
        searchInput={{ id: "form-select-control-category" }}
      />
      <Form.Field
        width={2}
        id="form-button-control-search-button"
        control={Button}
        content="Search"
      />
    </Form.Group>
    <Form.Field
      id="form-button-control-advanced-settings"
      control={Button}
      content="Advanced Settings"
    />
  </Form>
);

export default FilterBar;
