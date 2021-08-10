import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod'
import mdl from './TaskRetrieve.module.css'

function TaskRetrieve(props) {
    // // ----------Localization hooks & Router Hooks-------------
    const history = useHistory()


    // // ----------Props & context & ref ------------------------------




    // // ----------hooks useState--------------------------------------------------
    const [tasks, setTask] = useState([]);
    const [tableHeaderLocation, setTableHeaderLocation] = useState("right")


    // // ----------hooks useEffect--------------------------------------------------
    useEffect(() => {
        loadTask();
    }, []);

    const loadTask = async () => {
        var taskdataLocalStorage = localStorage.getItem('taskList');
        let tasksLocalStorage = JSON.parse(taskdataLocalStorage)
        // setTask(tasks.reverse());
        setTask(tasksLocalStorage);
    };


    // // ----------handler functions--------------------------------------------------
    const handleDeleteTask = taskID => {
        let filteredTask = tasks.filter(tasks => tasks.id !== taskID)
        setTask(filteredTask)
        localStorage.setItem('taskList', JSON.stringify(filteredTask))
    };

    const handleEditTask = (task) => {
        let testB = { Key1: "value1", Key2: "value2" } // only for test not use in application
        // // 1st way using props.history
        // props.history.push(`/task/update/${task.id}`, {
        //     task: task,
        //     testB: testB
        // })
        // // 2nd way ==>using useHistory hooks
        history.push(`/task/update/${task.id}`, {
            task: task,
            testB: testB
        })
    }

    const handleTaskDetail = (tasks, task) => {
        // // 1st way using props.history
        props.history.push(`/task/detail/${task.id}`, {
            tasks: tasks, // total task list
            task: task   // single task
        })
    }

    return (
        <React.Fragment>
            <div className="container">
                <div className="py-4">
                    <h1>Task List with Horizental Header</h1>
                    {tasks != null && tasks.length > 0 ?
                        <table className={allClass("table border shadow", "table_hooks", mdl)}>
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Sr.NO.</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task, index) => (
                                    <tr key={task.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{task.id}</td>
                                        <td>{task.date}</td>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>
                                            <button className={allClass("btn btn-outline-primary mr-2", "buttonStyl ", mdl)} onClick={(e) => handleTaskDetail(tasks, task)} >Detail</button>
                                            <button className={allClass("btn btn-warning", "buttonStyl ", mdl)} onClick={(e) => handleEditTask(task)} > Edit </button>
                                            {/* <Link to={`/task/update/${task.id}/${task.date}/${task.title}/${task.description}`} type="button" className="btn btn-warning">Edit </Link>  */}
                                            <button className={allClass("btn btn-danger", "buttonStyl ", mdl)} onClick={(e) => handleDeleteTask(task.id)} > Delete </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        : <h5>Task is not available.</h5>}
                </div>
            </div>

        </React.Fragment>
    )
}

export default TaskRetrieve
