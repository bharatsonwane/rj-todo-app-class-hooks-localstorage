import React from 'react'
import { Link } from "react-router-dom"
import mdl from "./TaskRetrieveDetail.module.css"
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod'

function TaskRetriveDetail(props) {
    // // ----------Localization hooks & Router Hooks-------------


    // // ----------Props & context & ref ------------------------------
    // // // 1st way => taking task data => using react router
    let task = props.location.state.task
    let tasks = props.location.state.tasks
    console.log("tasks:", tasks, "task:", task)

    const { id, date, title, description, technology, library } = task
    let libraryList = []
    if (library.redux === true) {
        libraryList.push("redux")
    }
    if (library.saga === true) {
        libraryList.push("saga")
    }
    if (library.numpy === true) {
        libraryList.push("numpy")
    }
    if (library.pandas === true) {
        libraryList.push("pandas")
    }

    // // ----------handler functions--------------------------------------------------
    const handleDeleteTask = taskID => {
        let filteredTask = tasks.filter(tasks => tasks.id !== taskID)
        localStorage.setItem('taskList', JSON.stringify(filteredTask))
        props.history.push(`/task/retrieve`);
    };
    const handleEditTask = (task) => {
        let testB = { Key1: "value1", Key2: "value2" } // only for test not use in application
        // // 1st way using props.history
        props.history.push(`/task/update/${task.id}`, {
            task: task,
            testB: testB
        })
        // // 2nd way ==>using useHistory hooks
        // history.push(`/task/update/${task.id}`, {
        //     task: task,
        //     testB: testB
        // })
    }

    return (
        <React.Fragment>
            <h3>Task Detail</h3>
            <div>
                <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Retrieve </Link>
                <button className={allClass("btn btn-warning", "buttonStyl", mdl)} onClick={(e) => handleEditTask(task)} > Edit </button>
                <button className={allClass("btn btn-danger", "buttonStyl", mdl)} onClick={(e) => handleDeleteTask(task.id)} > Delete </button>
            </div>
            <div className={mdl.container}>
                <table >
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <td>{date}</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>{title}</td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{description}</td>
                        </tr>
                        <tr>
                            <th>UI Technology</th>
                            <td>{technology.uiTech}</td>
                        </tr>
                        <tr>
                            <th>Back End Technology</th>
                            <td>{technology.backEndTech}</td>
                        </tr>
                        <tr>
                            <th>Library Used</th>
                            <td>
                                {libraryList.map(lib => {
                                    let para = <span>{lib}, </span>
                                    return para
                                })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default TaskRetriveDetail
