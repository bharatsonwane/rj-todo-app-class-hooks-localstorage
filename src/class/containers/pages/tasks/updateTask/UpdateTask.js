import React, { Component } from "react";
import FormTask1state from '../taskForm/FormTask2stateNestedState'

class UpdateTask extends Component {
    data = localStorage.getItem('taskList')
    tasks = JSON.parse(this.data)

    constructor(props) {
        super(props)
        // // // (to use different way should check Route in AppClass.js & RetrieveTask.js)
        // // // 1st way => taking task data => using react router 
        let task = this.props.location.state.task
        console.log(this.props.location.state)

        // // // 2nd way => taking task data =>using id find data in local storage
        // let taskId = this.props.match.params.id
        // let task = this.tasks.find(task => task.id == taskId)

        // // // 3rd way => taking task data => passing all data in url 
        // let task = this.props.match.params


        this.state = {
            taskField: task,
            isTaskUpdate: true
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Edit Task</h1>
                <FormTask1state history={this.props.history} taskState={this.state} />
            </div>
        )
    }
}

export default UpdateTask;
