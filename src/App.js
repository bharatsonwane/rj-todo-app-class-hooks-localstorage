import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css';
// import AppClass from "./class/AppClass";
import AppHooks from "./hooks/AppHooks";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <AppClass /> */}
        <AppHooks />
      </div>
    )
  }
}

export default App;
