import React, { Component } from "react";
import FormTask1state from '../taskForm/FormTask1state'

class CreateTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskField : {
                id: "",
                date: "",
                title: "",
                description: "",
                technology: { uiTech: "", backEndTech: "" },
                library: { redux: false, saga: false, numpy: false, pandas: false }
            },
            isTaskUpdate: false
        }
    }

    render() {

        return (
            <div className="App">
                <h1>Add Task</h1>
                <FormTask1state history={this.props.history} taskState={this.state}/>
            </div>
        )
    }
}

export default CreateTask;
