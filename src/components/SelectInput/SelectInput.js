import React from "react";
import RSelect from "react-select";
import classes from "./SelectInput.module.css";
const selectInput = (props) => {
  const options = [];
  props.options.forEach((element) => {
    options.push({ value: element, label: element });
  });
  return (
    <RSelect
      options={options}
      onChange={props.changed}
      className={classes.Select}
      placeholder={"Select a country:"}
    />
  );
};

export default selectInput;
