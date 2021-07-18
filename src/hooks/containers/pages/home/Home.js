import React, { Fragment } from 'react'
import mdl from './Home.module.css'

function Home() {
    return (
        <Fragment>
            <div className={mdl.homeContainer}>
                <h1 className={mdl.h1__classs}>Home Page of ToDo App</h1>
                <h3>General Todo Web information.</h3>
                <p> ToDo App is simple and awesome app to organize your tasks with very easy to use interface. </p>
                <p>  ToDo can help you to make list of your tasks and also you can set Reminder with specific tasks. </p>
                <p> It reminds you at you specified Time.<br></br>  </p>
                <button>This is button</button>
                <div> We believe that we only focus on our Today and Tomorrow tasks, which is most important. So we made user interface like that so that it can give you a quick view on your day timeline. </div>
            </div>
            <h1 className={mdl.h1__classs}>Home Page of ToDo App</h1>
        </Fragment>
    )
}

export default Home
