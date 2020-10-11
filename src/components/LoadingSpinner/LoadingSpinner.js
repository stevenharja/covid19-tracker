import { render } from "@testing-library/react";
import React, { Component } from "react";

class LoadingSpinner extends Component {
  render() {
    return <h1>Async call in progress</h1>;
  }
}

export default LoadingSpinner;
