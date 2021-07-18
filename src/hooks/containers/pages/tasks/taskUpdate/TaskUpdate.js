import React from 'react'
import { useParams } from "react-router-dom"
import TaskForm1state from '../taskForm/TaskForm1state';

function TaskUpdate(props) {
    // console.log("In porps params is available & by using useParams hooks we can get params",props)
    const params = useParams();
    var taskId = params.id

    // // // (to use different way should check Route in AppHooks.js & TaskRetrieve.js)
    // // // 1st way => taking task data => using react router 
    let taskField = props.location.state.task
    console.log(props.location.state)

    // // // 2nd way => taking task data =>using id find data in local storage
    // const data = localStorage.getItem('taskList')
    // const tasks = JSON.parse(data)
    // let taskField = tasks.find(task => task.id === taskId)

    // // // 3rd way ==> taking task data ==> passing all data in url
    // let taskField = params

    let isTaskUpdate = true
    return (
        <div>
            <div className="App">
                <h1>Edit Task</h1>
                <TaskForm1state taskField={taskField} isTaskUpdate={isTaskUpdate} />
            </div>
        </div>
    )
}

export default TaskUpdate
