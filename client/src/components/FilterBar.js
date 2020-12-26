import React from "react";
import { Form, Input, Button, Select } from "semantic-ui-react";

const categoryOptions = [
  { key: "c", text: "Clothing", value: "clothing" },
  { key: "h", text: "Headphones", value: "headphones" },
  { key: "j", text: "Jewelry", value: "jewelry" },
  { key: "k", text: "Keys", value: "keys" },
  { key: "l", text: "Laptops", value: "laptops" },
  { key: "p", text: "Phones", value: "phones" },
  { key: "s", text: "Student IDs", value: "students ids" },
  { key: "t", text: "Tablets", value: "tablets" },
  { key: "u", text: "Umbrellas", value: "umbrellas" },
  { key: "w", text: "Water Bottles", value: "water bottles" },
  { key: "o", text: "Other Electronics", value: "other electronics" },
  { key: "m", text: "Miscellaneous", value: "miscellaneous" },
];

const FilterBar = () => (
  <Form>
    <Form.Group>
      <Form.Field
        id="form-input-control-search"
        control={Input}
        placeholder="Search Items"
      />
      <Form.Field
        control={Select}
        options={categoryOptions}
        placeholder="Category"
        search
        searchInput={{ id: "form-select-control-category" }}
      />
      <Form.Field
        id="form-button-control-search-button"
        control={Button}
        content="Search"
      />
      <Form.Field
        id="add-item"
        control={Button}
        content="+ Add Item"
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
