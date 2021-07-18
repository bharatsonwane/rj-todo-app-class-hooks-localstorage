import React, { useState } from 'react'
import { allClass } from '../../../../constants/customHooks/customModuleClassMethod'
import mdl from "./TaskForm.module.css"
import { useHistory, Link } from "react-router-dom"
import { useStateCallback } from "../../../../constants/customHooks/customHooks"


function TaskForm1state(props) {
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

    // // ----------hooks useState--------------------------------------------------
    const [task, setTask] = useStateCallback(taskField);
    const [err, setErr] = useState({})


    // // ----------hooks useEffect--------------------------------------------------


    // // ----------handler functions--------------------------------------------------
    const { id, date, title, description, technology, library } = task;
    const { idErr, titleErr, uiTechErr, backEndTechErr, } = err
    const handleInputChange = e => {
        if (e.target.type === "checkbox") {
            // // // ### 1st way to update nested state ###
            let updatedTask = { ...task }
            updatedTask.library[e.target.name] = !updatedTask.library[e.target.name]
            setTask({ ...updatedTask })

            // // // ### 2nd way to update nested state###
            // task.library[e.target.name] = !task.library[e.target.name] // only state will change but page will not rerender
            // setTask(prevState => ({ ...prevState }))                   // to rerender page
            const nameForm = e.target.name
            formValidation(task, nameForm);

            // // // ### 3rd way to update nested state###
            // setTask(prevState => ({
            //     ...prevState,
            //     library: {
            //         ...prevState.library,
            //         [e.target.name]: !prevState.library[e.target.name]
            //     }
            // }),
            //     task => {
            //         const nameForm = e.target.name
            //         formValidation(task, nameForm);
            //     })
        }
        else if (e.target.type === "select-one" || e.target.type === "radio") {
            // // // ###1st way to update nested state###
            let updatedTask = { ...task }
            updatedTask.technology[e.target.name] = e.target.value
            setTask({ ...updatedTask })

            // // // ###2nd way to update nested state###
            // task.technology[e.target.name] = e.target.value // only state will change but page will not rerender
            // setTask(prevState => ({ ...prevState }))        // to rerender page

            // // // ###3rd way to update nested state###
            // setTask(prevState => ({
            //     ...prevState,
            //     technology: {
            //         ...prevState.technology,
            //         [e.target.name]: e.target.value
            //     }
            // }),
            //     task => {
            //         const nameForm = e.target.name
            //         formValidation(task, nameForm);
            //     })


            const nameForm = e.target.name
            formValidation(task, nameForm);
        }
        else {
            // // trimStart() === trimLeft()  &and& trimEnd() === trimRight()
            setTask({ ...task, [e.target.name]: e.target.value.trimLeft() },
                task => {
                    const nameForm = e.target.name
                    formValidation(task, nameForm);
                })
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


        // // // ###2nd way to update nested state###
        // task.id = ""
        // task.date = ""
        // task.title = ""
        // task.description = ""
        // task.technology = { uiTech: "", backEndTech: "" }
        // task.library = { redux: false, saga: false, numpy: false, pandas: false }
        // err.idErr = ""
        // err.titleErr = ""
        // err.uiTechErr = ""
        // err.backEndTechErr = ""
        // setTask(prevState => ({ ...prevState }))
    }

    const formValidation = (task, nameForm) => {
        switch (nameForm) {
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

                // // ###1st way to update state in loop (here forEach loop)###
                err.titleErr = titleErr
                setErr(prevState => ({ ...prevState, ...err }))

                // // ###2nd way to update state in loop (here forEach loop)###
                // setErr(prevState => ({ ...prevState, titleErr: titleErr })) // useState hook if we update errState normaly in loop then only last state will update 
                break;

            case "uiTech":
                let uiTechErr = ""
                const uiTechValue = task.technology.uiTech
                if (uiTechValue === "") {
                    uiTechErr = "Select UI Technology."
                }
                else {
                    uiTechErr = ""
                }
                // // ###1st way to update state in loop (here forEach loop)###
                err.uiTechErr = uiTechErr
                setErr(prevState => ({ ...prevState, ...err }))

                // // ###2nd way to update state in loop (here forEach loop)###
                // setErr(prevState => ({ ...prevState, uiTechErr: uiTechErr })) // useState hook if we update errState normaly in loop then only last state will update 
                break

            case "backEndTech":
                let backEndTechErr = ""
                const backEndTechValue = task.technology.backEndTech
                if (backEndTechValue === "") {
                    backEndTechErr = "Select Back End Technology."
                }
                else {
                    backEndTechErr = ""
                }
                // // ###1st way to update state in loop (here forEach loop)###
                err.backEndTechErr = backEndTechErr
                setErr(prevState => ({ ...prevState, ...err }))

                // // ###2nd way to update state in loop (here forEach loop)###
                // setErr(prevState => ({ ...prevState, backEndTechErr: backEndTechErr })) // useState hook if we update errState normaly in loop then only last state will update 
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
                        <input disabled={formEdit} type="text" name="id" value={id} onChange={e => handleInputChange(e)} className={allClass("text-field", "formInput", mdl)} placeholder="Enter task ID" /><br></br>
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
                        </label >
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

export default TaskForm1state
