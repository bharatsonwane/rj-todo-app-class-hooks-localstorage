import React, { Component } from 'react'
import mdl from "./RetrieveTask.module.css"
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod'
import { Link } from "react-router-dom" // commented

class RetrieveTask extends Component {
    // // ----------constructor------------------------------
    constructor(props) {
        super(props)
        // // ----------Props & context & ref ------------------------------


        // // ----------Object Property------------------------------


        // // ----------state------------------------------
        this.state = {
            tasks: [],
            nullData: false,
            isDeleted: false,
        }
    }


    // // ----------Lifecycle Method------------------------------
    // async request
    componentDidMount() {
        this.loadTask()
    }

    loadTask = () => {
        var taskdata = localStorage.getItem('taskList');

        if (taskdata == null) {
            this.setState({ nullData: true })
        }
        else if (taskdata === "[]") {
            this.setState({ isDeleted: true })
        }
        else {
            var tasks = JSON.parse(taskdata)
            this.setState({ tasks })
        }
    }

    // // ----------handler functions--------------------------------------------------
    handleDeleteTask(taskID) {
        const { tasks } = this.state;
        this.setState({
            tasks: tasks.filter(tasks => tasks.id !== taskID)
        },
            // 2nd argument of setState ==> callback function ==> optional argument
            () => {
                localStorage.setItem('taskList', JSON.stringify(this.state.tasks))
            });
    }

    handleEditTask = (task) => {
        let testB = { Key1: "value1", Key2: "value2" } // only for test not use in application
        this.props.history.push(`/task/update/${task.id}`, {
            task: task,
            testB: testB
        })
    }

    handleTaskDetail = (tasks, task) => {
        // // 1st way using props.history
        this.props.history.push(`/task/detail/${task.id}`, {
            tasks: tasks, // total task list
            task: task   // single task
        })
    }

    // // ----------Render------------------------------
    render() {
        const { tasks, nullData, isDeleted } = this.state
        return (
            <div className="container">
                <div className="py-4">
                    <h1>Task List</h1>
                    {tasks != null && tasks.length > 0 ? (
                        <table className={mdl.table_class}>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Date</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Detail</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tasks.map(task => {
                                    return (
                                        <tr key={task.id}>
                                            <td>{task.id}</td>
                                            <td>{task.date}</td>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td><button className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)} onClick={(e) => this.handleTaskDetail(tasks, task)} >Detail</button></td>
                                            <td><button onClick={(e) => this.handleEditTask(task)} type="button" className="btn btn-warning">Edit</button></td>
                                            {/* <td><Link to={`/task/update/${task.id}/${task.date}/${task.title}/${task.description}`} type="button" className="btn btn-warning">Edit</Link></td> */}
                                            <td><button type="button" className="btn btn-danger" onClick={() => this.handleDeleteTask(task.id)}>Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    ) : isDeleted == true ? (
                        <div>
                            All Data is deleted.
                        </div>
                    ) : <div>Task is not available</div>}
                </div>
            </div>
        )
    }
}

export default RetrieveTask
