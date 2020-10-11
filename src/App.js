import React, { Component } from "react";
import classes from "./App.module.css";
import axios from "axios";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import MapMarkersList from "./components/Map/MapMarkersList/MapMarkersList";
import CovidResults from "./components/CovidResults/CovidResults";
import SelectInput from "./components/SelectInput/SelectInput";

class App extends Component {
  state = {
    countrySelected: null,
    countrySelectedData: null,
    countriesData: null,
    worldwideData: null,
    countriesAffected: null,
  };

  async componentDidMount() {
    console.log("[App.js] componentDidUpdate call");
    const countriesUrl = `https://disease.sh/v3/covid-19/countries?yesterday=true`;
    const worldwideUrl = `https://disease.sh/v3/covid-19/all?yesterday=true`;
    const countriesData = await this.axiosGet(countriesUrl);
    const worldwideData = await this.axiosGet(worldwideUrl);
    const countriesAffected = [];
    countriesData.forEach((element) => {
      countriesAffected.push(element.country);
    });
    this.setState({ countriesData, worldwideData, countriesAffected });
  }

  async axiosGet(url) {
    const response = await axios.get(url);

    const { data } = response;
    return data;
  }

  markerCountrySelectedHandler = (country = null) => {
    this.setState({ countrySelected: null });
    if (country) {
      const countrySelectedData = this.state.countriesData.find((element) => {
        return element.country === country;
      });
      this.setState({ countrySelected: country, countrySelectedData });
    }
  };

  selectCountryHandler = (selection) => {
    this.setState({ countrySelected: null });
    const countrySelectedData = this.state.countriesData.find((element) => {
      return element.country === selection.value;
    });
    if (countrySelectedData) {
      this.setState({ countrySelected: selection.value, countrySelectedData });
    }
  };
  render() {
    let markerList;
    let countrySummary;
    let loader;
    let countrySelection = [];
    if (this.state.countriesAffected) {
      countrySelection.push("Worldwide");
      countrySelection.push(...this.state.countriesAffected);
    }
    if (this.state.countriesData) {
      markerList = (
        <MapMarkersList
          data={this.state.countriesData}
          clicked={this.markerCountrySelectedHandler}
        />
      );
    }

    if (this.state.worldwideData && !this.state.countrySelected) {
      countrySummary = (
        <CovidResults
          countrySelected={"Worldwide"}
          data={this.state.worldwideData}
        />
      );
    }

    if (this.state.countrySelected) {
      countrySummary = (
        <CovidResults
          countrySelected={this.state.countrySelected}
          data={this.state.countrySelectedData}
        />
      );
    }

    if (!this.state.countriesData || !this.state.worldwideData) {
      loader = (
        <React.Fragment>
          <Loader type="ThreeDots" color="#5b86e5" height={200} width={200} />
          <span className={classes.Span}>
            If loading persists, please check again later.
          </span>
        </React.Fragment>
      );
    }

    const bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

    return (
      <div className={classes.Container}>
        <div className={classes.Logo}>COVID-19 Tracker</div>
        <Map
          center={[0, 0]}
          zoom={3}
          className={classes.Map}
          minZoom={3}
          maxBounds={bounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            noWrap={true}
          />
          {markerList}
        </Map>
        {loader}
        <SelectInput
          options={countrySelection}
          changed={this.selectCountryHandler}
        />
        {countrySummary}
      </div>
    );
  }
}

export default App;
