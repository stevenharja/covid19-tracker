import React from "react";
import CountUp from "react-countup";
import classes from "./Stats.module.css";
const stats = (props) => {
  return (
    <div className={classes.Stats}>
      <div className={classes.Title}>{props.title}</div>
      <CountUp
        end={props.content}
        className={classes.CountUp}
        separator=","
      ></CountUp>
    </div>
  );
};

export default stats;
