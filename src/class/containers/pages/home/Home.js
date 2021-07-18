import React, { Component } from "react";
import mdl from "./Home.module.css"

class Home extends Component {
    render() {
        return (
            <div className="App">
                <h1 className={mdl.home_red}>Home Page</h1>
            </div>
        )
    }
}

export default Home;
