import React, { Component } from 'react'
import mdl from './FormTask.module.css'
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod'
import { Link } from "react-router-dom"


class FormTask3ref extends Component {
    // // ----------constructor------------------------------
    constructor(props) {
        super(props)
        // // ----------Props & context & ref ------------------------------
        const taskState = this.props.taskState
        const taskField = taskState.taskField
        const isTaskUpdate = taskState.isTaskUpdate

        // using ref for validation field value
        this.idValueRef = React.createRef()
        this.titleValueRef = React.createRef()
        this.uiTechValueRef = React.createRef()
        this.backEndTechValuePythonRef = React.createRef()
        this.backEndTechValue_NetRef = React.createRef()
        this.backEndTechValuePhpRef = React.createRef()


        // // ----------Object Property------------------------------
        if (isTaskUpdate === true) {
            this.formEdit = true
        } else {
            this.formEdit = false
        }

        // geting array from local storage
        let data = localStorage.getItem('taskList')
        if (data == null) {
            this.taskData = [];
        }
        else if (data === "[]") {
            this.taskData = [];
        }
        else {
            this.taskData = JSON.parse(data)
        }

        // // ----------state------------------------------
        this.state = {
            taskField: { ...taskField },
            err: {
                idErr: "",
                titleErr: "",
                uiTechErr: "",
                backEndTechErr: ""
            }
        }
    }

    // // ----------Lifecycle Method------------------------------
    // componentDidMount() {

    // }

    // shouldComponentUpdate() {

    //     return true
    // }

    // componentDidUpdate() {

    // }


    // // ----------handler functions--------------------------------------------------
    handleInputChange = (e) => {
        if (e.target.type === "checkbox") {
            let updatedTask = { ...this.state }
            updatedTask.taskField.library[e.target.name] = !updatedTask.taskField.library[e.target.name]
            this.setState({ ...updatedTask },
                state => {
                    let nameForm = e.target.name
                    this.formValidation(nameForm)
                })
        }
        else if (e.target.type === "select-one" || e.target.type === "radio") {
            let updatedTask = { ...this.state }
            updatedTask.taskField.technology[e.target.name] = e.target.value
            this.setState({ ...updatedTask },
                state => {
                    let nameForm = e.target.name
                    this.formValidation(nameForm)
                })
        }
        else {
            // // trimStart() === trimLeft()  &and& trimEnd() === trimRight()
            let updatedTask = { ...this.state }
            updatedTask.taskField[e.target.name] = e.target.value.trimLeft()
            this.setState({ ...updatedTask },
                state => {
                    let nameForm = e.target.name
                    this.formValidation(nameForm)
                })
        }
    };

    handleCreateTask = (e) => {
        const nameFormList = ["id", "title", "uiTech", "backEndTech"]
        nameFormList.forEach((nameForm) => {
            this.formValidation(nameForm)
        })
        const { id, title, date, description, technology, library } = this.state.taskField
        const { uiTech, backEndTech } = technology
        const { idErr, titleErr, uiTechErr, backEndTechErr } = this.state.err
        if (id && title && uiTech && backEndTech && !idErr && !titleErr && !uiTechErr && !backEndTechErr) {
            let task = this.state.taskField
            this.taskData.push(task);
            localStorage.setItem('taskList', JSON.stringify(this.taskData))
            this.props.history.push(`/task/retrieve`)
        }
    }

    handleUpdateTask = (e) => {
        const { id, title, date, description, technology, library } = this.state.taskField
        const { uiTech, backEndTech } = technology
        const { idErr, titleErr, uiTechErr, backEndTechErr } = this.state.err
        if (id && title && uiTech && backEndTech && !idErr && !titleErr && !uiTechErr && !backEndTechErr) {
            let taskUpdated = this.state.taskField
            const editedtast = this.taskData.map(task => {
                if (task.id === this.state.taskField.id) {
                    return taskUpdated
                }
                return task
            })
            localStorage.setItem('taskList', JSON.stringify(editedtast))
            this.props.history.push(`/task/retrieve`)
        }
    }

    handleResetTask = () => {
        this.setState({
            taskField: {
                id: "",
                date: "",
                title: "",
                description: "",
                technology: { uiTech: "", backEndTech: "" },
                library: { redux: false, saga: false, numpy: false, pandas: false }
            },
            err: {
                idErr: "",
                titleErr: "",
                uiTechErr: "",
                backEndTechErr: "",
            }
        })
    }

    formValidation = (nameForm) => {
        let updatedTask = { ...this.state }
        switch (nameForm) {
            // // id validation
            case 'id':
                let idErr = ""
                const idValue = this.idValueRef.current.value
                if (idValue === "" || null) {
                    idErr = "ID must not be empty"
                }
                else if (idValue.trim().length < 3) {
                    idErr = 'Id must be at least 3 characters!'
                }
                else {
                    idErr = ""
                }
                // // // ### 1st way to update nested state ###
                updatedTask.err.idErr = idErr
                this.setState({ ...updatedTask })
                break;

            // // title validation
            case 'title':
                let titleErr = ""
                const regExp = /^[ 0-9a-zA-Z ]+$/
                const titleValue = this.titleValueRef.current.value
                if (titleValue === null || titleValue.trim() === "") {
                    titleErr = "Title must not be empty"
                }
                else {
                    if (titleValue.match(regExp)) {
                        if (titleValue.trim().length < 5) {
                            titleErr = "Title must contain at least 5 characters"
                        }
                        else if (titleValue.trim().length > 15) {
                            titleErr = "Title must not exceed 15 characters"
                        }
                        else {
                            titleErr = ""
                        }
                    }
                    else {
                        titleErr = 'Title must not contain any symbols'
                    }
                }
                // // // ### 1st way to update nested state ###
                updatedTask.err.titleErr = titleErr
                this.setState({ ...updatedTask })
                break;

            case "uiTech":
                let uiTechErr = ""
                const uiTechValue = this.uiTechValueRef.current.value
                if (uiTechValue === "") {
                    uiTechErr = "Select UI Technology."
                }
                else {
                    uiTechErr = ""
                }
                // // // ### 1st way to update nested state ###
                updatedTask.err.uiTechErr = uiTechErr
                this.setState({ ...updatedTask })
                break

            case "backEndTech":
                let backEndTechErr = ""
                let backEndTechValue
                let pythonRef = this.backEndTechValuePythonRef.current.checked
                let netRef = this.backEndTechValue_NetRef.current.checked
                let phpRef = this.backEndTechValuePhpRef.current.checked
                if (pythonRef === true) {
                    backEndTechValue = this.backEndTechValuePythonRef.current.value
                } else if (netRef === true) {
                    backEndTechValue = this.backEndTechValue_NetRef.current.value
                } else if (phpRef === true) {
                    backEndTechValue = this.backEndTechValuePhpRef.current.value
                } else {
                    backEndTechValue = ""
                }

                if (backEndTechValue === "") {
                    backEndTechErr = "Select Back End Technology."
                }
                else {
                    backEndTechErr = ""
                }
                // // // ### 1st way to update nested state ###
                updatedTask.err.backEndTechErr = backEndTechErr
                this.setState({ ...updatedTask })
                break

            default:
                break;
        }
    }


    // // ----------Render------------------------------
    render() {
        const { id, date, title, description, technology, library } = this.state.taskField
        const { idErr, titleErr, uiTechErr, backEndTechErr } = this.state.err
        return (
            <div>
                <form className={mdl.formStyle}>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable} >Task id:</label>
                            <input disabled={this.formEdit} type="text" name="id" value={id} ref={this.idValueRef} onChange={e => this.handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder="Enter task ID" />
                        </div>
                        <small style={{ color: "red" }}>{idErr}</small>
                    </div>

                    <div className={allClass("", "formField col", mdl)}>
                        <label className={mdl.formLable} >Date:</label>
                        <input type="date" name="date" value={date} onChange={e => this.handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} />
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <label className={mdl.formLable}>Task Title:</label>
                            <input type="text" name="title" value={title} ref={this.titleValueRef} onChange={e => this.handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder="Enter Task Title." />
                        </div>
                        <small style={{ color: "red" }}>{titleErr}</small>
                    </div>
                    <div className={allClass("", "formField col", mdl)}>
                        <label className={mdl.formLable} >Task description :</label>
                        <textarea rows="6" cols="30" name="description" value={description} onChange={e => this.handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} />
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)} >
                            <div className={mdl.formLable}  >UI Technology:</div>
                            <select name='uiTech' value={technology.uiTech} ref={this.uiTechValueRef} onChange={e => this.handleInputChange(e)} className="form-dropdown text-field">
                                <option value="" > Select </option>
                                <option value="react" > React </option>
                                <option value="angular"> Angular </option>
                                <option value="flutter"> Flutter </option>
                                <option value="vue.js"> Vue.js </option>
                            </select>
                        </div>
                        <small style={{ color: "red" }}>{uiTechErr}</small>
                    </div>
                    <div>
                        <div className={allClass("", "formField col", mdl)}>
                            <div className={mdl.formLable} >Back-End Technology :</div>
                            <label className={mdl.formBackEndLabel}>Python
                                <input type="radio" name="backEndTech" value="python" ref={this.backEndTechValuePythonRef} onChange={e => this.handleInputChange(e)} checked={technology.backEndTech === 'python'} />
                            </label>
                            <label className={mdl.formBackEndLabel}>.NET
                                <input type="radio" name="backEndTech" value=".net" ref={this.backEndTechValue_NetRef} onChange={e => this.handleInputChange(e)} checked={technology.backEndTech === '.net'} />
                            </label>
                            <label className={mdl.formBackEndLabel}>PHP
                                <input type="radio" name="backEndTech" value="php" ref={this.backEndTechValuePhpRef} onChange={e => this.handleInputChange(e)} checked={technology.backEndTech === 'php'} />
                            </label>
                        </div>
                        <small style={{ color: "red" }}>{backEndTechErr}</small>
                    </div>
                    <div className={allClass("", "formField col", mdl)}>
                        <div className={mdl.formLable} >Library Used:</div>
                        <label className={mdl.formLibraryLabel}>Redux<input type="checkbox" name="redux" onChange={e => this.handleInputChange(e)} checked={library.redux} /> </label>
                        <label className={mdl.formLibraryLabel}>Saga<input type="checkbox" name="saga" onChange={e => this.handleInputChange(e)} checked={library.saga} /> </label>
                        <label className={mdl.formLibraryLabel}>Numpy<input type="checkbox" name="numpy" onChange={e => this.handleInputChange(e)} checked={library.numpy} /> </label>
                        <label className={mdl.formLibraryLabel}>Pandas<input type="checkbox" name="pandas" onChange={e => this.handleInputChange(e)} checked={library.pandas} /></label>
                    </div>

                    {this.formEdit === false ?
                        <div className="field-btn">
                            <button type='button' onClick={event => this.handleCreateTask(event)} className={allClass("btn btn-success", "buttonStyl", mdl)}>AddTask</button>
                            <button type="reset" onClick={event => this.handleResetTask(event)} className={allClass("btn btn-secondary", "buttonStyl", mdl)} >Reset</button>
                            <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel </Link>
                        </div>
                        :
                        <div className="field-btn">
                            <button type='button' onClick={event => this.handleUpdateTask(event)} className={allClass("btn btn-warning", "buttonStyl", mdl)}>Update Task</button>
                            <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel </Link>
                        </div>
                    }
                </form>
            </div>
        )
    }
}

export default FormTask3ref
