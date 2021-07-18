import React from 'react'
import TaskForm1state from '../taskForm/TaskForm1state';

function TaskCreate() {

    const taskField = {
        id: "",
        date: "",
        title: "",
        description: "",
        technology: { uiTech: "", backEndTech: "" },
        library: { redux: false, saga: false, numpy: false, pandas: false }
    }
    const isTaskUpdate = false

    return (
        <div>
            <div className="App">
                <h1>Add Task</h1>
                <TaskForm1state taskField={taskField} isTaskUpdate={isTaskUpdate} />
            </div>
        </div>
    )
}

export default TaskCreate
