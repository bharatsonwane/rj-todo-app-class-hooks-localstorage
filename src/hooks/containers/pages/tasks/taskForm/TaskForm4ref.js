import React, { useState, useRef } from 'react'
import mdl from "./TaskForm.module.css"
import { allClass } from '../../../../helper/customHooks/customModuleClassMethod'
import { useHistory, Link } from "react-router-dom"

function TaskForm4ref(props) {
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

    // using ref for validation field value
    const idValueRef = useRef(null)
    const titleValueRef = useRef(null)
    const uiTechValueRef = useRef(null)
    const backEndTechValuePythonRef = useRef(null)
    const backEndTechValue_NetRef = useRef(null)
    const backEndTechValuePhpRef = useRef(null)



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



    // // ----------hooks useState--------------------------------------------------
    const [task, setTask] = useState(taskField);
    const [err, setErr] = useState({})


    // // ----------hooks useEffect--------------------------------------------------

    const { id, date, title, description, technology, library } = task;
    const { idErr, titleErr, uiTechErr, backEndTechErr, } = err


    // // ----------handler functions--------------------------------------------------
    const handleInputChange = e => {
        if (e.target.type === "checkbox") {
            // // // ### 1st way to update nested state ###
            let updatedTask = { ...task }
            updatedTask.library[e.target.name] = !updatedTask.library[e.target.name]
            setTask({ ...updatedTask })

            const nameForm = e.target.name
            formValidation(task, nameForm);
        }
        else if (e.target.type === "select-one" || e.target.type === "radio") {
            // // // ###1st way to update nested state###
            let updatedTask = { ...task }
            updatedTask.technology[e.target.name] = e.target.value
            setTask({ ...updatedTask })
            const nameForm = e.target.name
            formValidation(task, nameForm);
        }
        else {
            // // trimStart() === trimLeft()  &and& trimEnd() === trimRight()
            setTask({ ...task, [e.target.name]: e.target.value.trimLeft() })
            const nameForm = e.target.name
            formValidation(task, nameForm);
        }
    };


    const handleCreateTask = (e) => {
        const nameFormList = ["id", "title", "uiTech", "backEndTech"]
        nameFormList.forEach((nameForm) => {
            formValidation(task, nameForm)
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
        setErr({
            idErr: "",
            titleErr: "",
            uiTechErr: "",
            backEndTechErr: "",
        })
    }

    const formValidation = (task, nameForm) => {
        switch (nameForm) {
            // // id validation
            case 'id':
                let idErr = ""
                // const idValue = document.forms["myForm"]["id"].value;  // not recommended in react
                const idValue = idValueRef.current.value
                if (idValue === "" || null) {
                    idErr = "ID must not be empty"
                }
                else if (idValue.trim().length < 3) {
                    idErr = 'Id must be at least 3 characters!'
                }
                else {
                    idErr = ""
                }

                // // ###1st way to update state in loop (here forEach loop)###
                err.idErr = idErr
                setErr(prevState => ({ ...prevState, ...err }))

                // // ###2nd way to update state in loop (here forEach loop)###
                // setErr(prevState => ({ ...prevState, idErr: idErr })) // useState hook if we update errState normaly in loop then only last state will update 
                break;

            // // title validation
            case 'title':
                let titleErr = ""
                const regExp = /^[0-9a-zA-Z ]+$/
                const titleValue = titleValueRef.current.value
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

                // // ###1st way to update state in loop (here forEach loop)###
                err.titleErr = titleErr
                setErr(prevState => ({ ...prevState, ...err }))
                break;

            case "uiTech":
                let uiTechErr = ""
                const uiTechValue = uiTechValueRef.current.value
                if (uiTechValue === "") {
                    uiTechErr = "Select UI Technology."
                }
                else {
                    uiTechErr = ""
                }
                // // ###1st way to update state in loop (here forEach loop)###
                err.uiTechErr = uiTechErr
                setErr(prevState => ({ ...prevState, ...err }))
                break

            case "backEndTech":
                let backEndTechErr = ""
                let backEndTechValue

                let pythonRef = backEndTechValuePythonRef.current.checked
                let netRef = backEndTechValue_NetRef.current.checked
                let phpRef = backEndTechValuePhpRef.current.checked
                if (pythonRef === true) {
                    backEndTechValue = backEndTechValuePythonRef.current.value
                } else if (netRef === true) {
                    backEndTechValue = backEndTechValue_NetRef.current.value
                } else if (phpRef === true) {
                    backEndTechValue = backEndTechValuePhpRef.current.value
                } else {
                    backEndTechValue = ""
                }

                if (backEndTechValue === "") {
                    backEndTechErr = "Select Back End Technology."
                }
                else {
                    backEndTechErr = ""
                }
                // // ###1st way to update state in loop (here forEach loop)###
                err.backEndTechErr = backEndTechErr
                setErr(prevState => ({ ...prevState, ...err }))
                break

            default:
                break;
        }
    }
    return (
        <div>
            <form name="myForm" className={mdl.formStyle}>
                <div>
                    <div className={allClass("", "formField col", mdl)}>
                        <label className={mdl.formLable} >Task id:</label>
                        <input disabled={formEdit} type="text" name="id" value={id} ref={idValueRef} onChange={e => handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder="Enter task ID" />
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
                        <input type="text" name="title" value={title} ref={titleValueRef} onChange={e => handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder="Enter Task Title." />
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
                        <select name='uiTech' value={technology.uiTech} ref={uiTechValueRef} onChange={e => handleInputChange(e)} className="form-dropdown text-field">
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
                            <input type="radio" name="backEndTech" value="python" ref={backEndTechValuePythonRef} onChange={e => handleInputChange(e)} checked={technology.backEndTech === 'python'} />
                        </label>
                        <label className={mdl.formBackEndLabel}>.NET
                            <input type="radio" name="backEndTech" value=".net" ref={backEndTechValue_NetRef} onChange={e => handleInputChange(e)} checked={technology.backEndTech === '.net'} />
                        </label>
                        <label className={mdl.formBackEndLabel}>PHP
                            <input type="radio" name="backEndTech" value="php" ref={backEndTechValuePhpRef} onChange={e => handleInputChange(e)} checked={technology.backEndTech === 'php'} />
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

export default TaskForm4ref
