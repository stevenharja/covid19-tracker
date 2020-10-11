import React from "react";
import Stats from "../Stats/Stats";
import classes from "./CovidResults.module.css";

const Result = (props) => {
  if (props) {
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const updatedDate = new Date(props.data.updated).toUTCString(
      undefined,
      dateOptions
    );
    return (
      <div>
        <div className={classes.Title}>
          <h1>{props.countrySelected}</h1>
          <h2>Last Updated: {updatedDate}</h2>
        </div>
        <div className={classes.StatsContainer}>
          <Stats title={"Current Active Cases"} content={props.data.active} />
          <Stats title={"Total Cases"} content={props.data.cases} />
          <Stats title={"Total Deaths"} content={props.data.deaths} />
          <Stats title={"Total Recovered"} content={props.data.recovered} />
          <Stats title={"Today's Cases"} content={props.data.todayCases} />
          <Stats title={"Today's Deaths"} content={props.data.todayDeaths} />
          <Stats
            title={"Today's Recovered"}
            content={props.data.todayRecovered}
          />
          <div className={classes.Credit}>
            Powered by:
            <a
              href="https://disease.sh/docs/#/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Disease.SH
            </a>
            <br />
            Created by:
            <a
              href="https://github.com/stevenharja"
              target="_blank"
              rel="noopener noreferrer"
            >
              Steven Harjapramana
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default Result;
