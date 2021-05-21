import React from 'react';
import "./SearchBar.css";

const SearchBar = (props: {input: string, onChange: Function}) => {
  return (
    <input 
      key="random1"
      className="search-bar"
      value={props.input}
      placeholder={"Search Items..."}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}

export default SearchBar