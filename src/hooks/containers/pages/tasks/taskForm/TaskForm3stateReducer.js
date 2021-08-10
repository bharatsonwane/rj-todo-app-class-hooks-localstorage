import React, { useState, useReducer } from 'react'
import mdl from "./TaskForm.module.css"
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod'
import { useHistory, Link } from "react-router-dom"

function TaskForm3stateReducer(props) {
    // // ----------Localization hooks & Router Hooks-------------
    let history = useHistory()


    // // ----------Props & context & ref ------------------------------
    const taskField = props.taskField
    const isTaskUpdate = props.isTaskUpdate
    var formEdit
    if (isTaskUpdate === true) {
        formEdit = true
    } else {
        formEdit = false
    }

    // // geting array from local storage
    var data = localStorage.getItem('taskList')
    var taskData
    if (data == null) {
        taskData = [];
    }
    else if (data === "[]") {
        taskData = [];
    }
    else {
        taskData = JSON.parse(data)
    }

    const initialStateReducerValidation = {
        idErr: "",
        titleErr: "",
        uiTechErr: "",
        backEndTechErr: "",
    }

    // // ----------hooks useState--------------------------------------------------
    const [task, setTask] = useState(taskField);


    // // ----------hooks useEffect--------------------------------------------------


    const { id, date, title, description, technology, library } = task;


    
    // // ----------handler functions--------------------------------------------------
    const handleInputChange = e => {
        // if we are using useReducer hook for validation in handleInputChange then there is no need of custom useStateCallback hook
        if (e.target.type === "checkbox") {
            // // // ### 1st way to update nested state ###
            let updatedTask = { ...task }
            updatedTask.library[e.target.name] = !updatedTask.library[e.target.name]
            setTask({ ...updatedTask })
            const nameForm = e.target.name
            dispatchToReducer({ type: nameForm, payload: task })                     // formValidation(task, nameForm);
        }
        else if (e.target.type === "select-one" || e.target.type === "radio") {
            // // // ###1st way to update nested state###
            let updatedTask = { ...task }
            updatedTask.technology[e.target.name] = e.target.value
            setTask({ ...updatedTask })
            const nameForm = e.target.name
            dispatchToReducer({ type: nameForm, payload: task })                     // formValidation(task, nameForm);
        }
        else {
            // // trimStart() === trimLeft()  &and& trimEnd() === trimRight()
            setTask({ ...task, [e.target.name]: e.target.value.trimLeft() })
            const nameForm = e.target.name
            dispatchToReducer({ type: nameForm, payload: task })
        }
    };


    const handleCreateTask = (e) => {
        const nameFormList = ["id", "title", "uiTech", "backEndTech"]
        nameFormList.forEach((nameForm) => {
            dispatchToReducer({ type: nameForm, payload: task })  // formValidation(task, nameForm)
        })
        if (id && title && technology.uiTech && technology.backEndTech && !idErr && !titleErr && !uiTechErr && !backEndTechErr) {
            taskData.push(task);
            localStorage.setItem('taskList', JSON.stringify(taskData))
            history.push(`/task/retrieve`);
        }
    }

    const handleUpdateTask = (e) => {
        if (id && title && technology.uiTech && technology.backEndTech && !idErr && !titleErr && !uiTechErr && !backEndTechErr) {
            const editedtast = taskData.map(taskArg => {
                if (taskArg.id === task.id) {
                    return task
                }
                return taskArg
            })
            localStorage.setItem('taskList', JSON.stringify(editedtast))
            history.push(`/task/retrieve`);
        }
    }

    const handleResetTask = () => {
        // // 1st way to update nested state.
        setTask({
            id: "",
            date: "",
            title: "",
            description: "",
            technology: { uiTech: "", backEndTech: "" },
            library: { redux: false, saga: false, numpy: false, pandas: false },
        })
        dispatchToReducer({ type: "resetForm" })
    }

    const formValidation = (state, action) => {
        switch (action.type) {
            // // id validation
            case 'id':
                let idErr = ""
                const idValue = task.id
                if (idValue === "" || null) {
                    idErr = "ID must not be empty"
                }
                else if (idValue.trim().length < 3) {
                    idErr = 'Id must be at least 3 characters!'
                }
                else {
                    idErr = ""
                }
                return ({ ...state, idErr: idErr })

            // // title validation
            case 'title':
                let titleErr = ""
                const regExp = /^[0-9a-zA-Z ]+$/
                const titleValue = task.title
                if (titleValue.trim() === "") {
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
                return ({ ...state, titleErr: titleErr })

            case "uiTech":
                let uiTechErr = ""
                const uiTechValue = task.technology.uiTech
                if (uiTechValue === "") {
                    uiTechErr = "Select UI Technology."
                }
                else {
                    uiTechErr = ""
                }
                return ({ ...state, uiTechErr: uiTechErr })

            case "backEndTech":
                let backEndTechErr = ""
                const backEndTechValue = task.technology.backEndTech
                if (backEndTechValue === "") {
                    backEndTechErr = "Select Back End Technology."
                }
                else {
                    backEndTechErr = ""
                }
                return ({ ...state, backEndTechErr: backEndTechErr })

            case "resetForm":
                return ({ idErr: "", titleErr: "", uiTechErr: "", backEndTechErr: "" })

            default: return { ...state }
        }
    }

    
    const [err, dispatchToReducer] = useReducer(formValidation, initialStateReducerValidation)
    const { idErr, titleErr, uiTechErr, backEndTechErr } = err


    return (
        <div>
            <form name="myForm" className={mdl.formStyle}>
                <div>
                    <div className={allClass("", "formField col", mdl)}>
                        <label className={mdl.formLable} >Task id:</label>
                        <input disabled={formEdit} type="text" name="id" value={id} onChange={e => handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder="Enter task ID" />
                    </div>
                    <small style={{ color: "red" }}>{idErr}</small>
                </div>

                <div className={allClass("", "formField col", mdl)}>
                    <label className={mdl.formLable} >Date:</label>
                    <input type="date" name="date" value={date} onChange={e => handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} />
                </div>

                <div>
                    <div className={allClass("", "formField col", mdl)}>
                        <label className={mdl.formLable}>Task Title:</label>
                        <input type="text" name="title" value={title} onChange={e => handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder="Enter Task Title." />
                    </div>
                    <small style={{ color: "red" }}>{titleErr}</small>
                </div>
                <div className={allClass("", "formField col", mdl)}>
                    <label className={mdl.formLable} >Task description :</label>
                    <textarea rows="6" cols="30" name="description" value={description} onChange={e => handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} />
                </div>
                <div>
                    <div className={allClass("", "formField col", mdl)} >
                        <div className={mdl.formLable}  >UI Technology:</div>
                        <select name='uiTech' value={technology.uiTech} onChange={e => handleInputChange(e)} className="form-dropdown text-field">
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
                            <input type="radio" name="backEndTech" value="python" onChange={e => handleInputChange(e)} checked={technology.backEndTech === 'python'} />
                        </label>
                        <label className={mdl.formBackEndLabel}>.NET
                            <input type="radio" name="backEndTech" value=".net" onChange={e => handleInputChange(e)} checked={technology.backEndTech === '.net'} />
                        </label>
                        <label className={mdl.formBackEndLabel}>PHP
                            <input type="radio" name="backEndTech" value="php" onChange={e => handleInputChange(e)} checked={technology.backEndTech === 'php'} />
                        </label>
                    </div>
                    <small style={{ color: "red" }}>{backEndTechErr}</small>
                </div>
                <div className={allClass("", "formField col", mdl)}>
                    <div className={mdl.formLable} >Library Used:</div>
                    <label className={mdl.formLibraryLabel}>Redux<input type="checkbox" name="redux" onChange={e => handleInputChange(e)} checked={task.library.redux} /> </label>
                    <label className={mdl.formLibraryLabel}>Saga<input type="checkbox" name="saga" onChange={e => handleInputChange(e)} checked={task.library.saga} /> </label>
                    <label className={mdl.formLibraryLabel}>Numpy<input type="checkbox" name="numpy" onChange={e => handleInputChange(e)} checked={task.library.numpy} /> </label>
                    <label className={mdl.formLibraryLabel}>Pandas<input type="checkbox" name="pandas" onChange={e => handleInputChange(e)} checked={task.library.pandas} /></label>
                </div>

                {formEdit === false ?
                    <div className="field-btn">
                        <button type='button' onClick={event => handleCreateTask(event)} className={allClass("btn btn-success", "buttonStyl", mdl)}>AddTask</button>
                        <button type="reset" onClick={event => handleResetTask(event)} className={allClass("btn btn-secondary", "buttonStyl", mdl)} >Reset</button>
                        <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel </Link>
                    </div>
                    :
                    <div className="field-btn">
                        <button type='button' onClick={event => handleUpdateTask(event)} className={allClass("btn btn-warning", "buttonStyl", mdl)}>Update Task</button>
                        <Link to={`/task/retrieve`} type="button" className={allClass("btn btn-outline-primary mr-2", "buttonStyl", mdl)}>Cancel </Link>
                    </div>
                }
            </form>
        </div>
    )
}

export default TaskForm3stateReducer
