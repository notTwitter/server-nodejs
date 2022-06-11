import express from 'express'
import session from 'express-session'
import cors from 'cors'
import bodyParser from 'body-parser'
import mysql from 'mysql'
import { BACKEND_PORT, DATABASE_CONFIG, FRONTEND_SERVER_PORT, FRONTEND_SERVER_URL, SESSION_SECRET } from './backend.config'
import { TextColors, cliSetup } from './Assets/init'
import { DATABASE_CONNECTION_TEST_QUERY } from './Database/databaseQueries'

//Route Imports
import * as Tests from './Routes/TestRoutes/tests'
import {registerUser} from './Routes/userHandling/registerUser'
import { deleteUser } from './Routes/userHandling/deleteUser'
import { checkAuth } from './Routes/userHandling/checkAuth'
import { loginUser } from './Routes/userHandling/loginUser'
import { createPost } from './Routes/postHandling/createPost'
import { deletePost } from './Routes/postHandling/deletePost'

//CLI Set Up
cliSetup()
//Server Set Up
const app = express()
export const jsonParser = bodyParser.json();
app.listen(BACKEND_PORT, () => {
    console.log(`${TextColors.FgBlue}${TextColors.Exit}`,`App running on port ${BACKEND_PORT}`)
})

//Database Init
export const DATABASE = mysql.createPool(DATABASE_CONFIG)
DATABASE.query(DATABASE_CONNECTION_TEST_QUERY, (err, result, fields)=>{
        if(err){
            console.log(`${TextColors.FgMagenta}${TextColors.Exit}`,`\n${err}\n`)
            console.log(`${TextColors.FgRed}${TextColors.Exit}`,"Connection to MySQL not established. Terminating programme...\n")
            process.kill(0)
        }else{
        console.log(`${TextColors.FgYellow}${TextColors.Exit}`,"Connection to MySQL established\n")
        }
    })


//Middleware
app.use(cors({
    origin: `http://${FRONTEND_SERVER_URL}:${FRONTEND_SERVER_PORT}`,
    credentials: true
}))
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: undefined,
    }
}))

//Test Endpoints
app.get('/serverTest', Tests.serverTest)
app.get('/authTest', Tests.authTest)

//User Handling Endpoints
app.post('/userHandling/registerUser',jsonParser, registerUser)
app.delete('/userHandling/deleteUser', jsonParser, deleteUser)
app.get('/userHandling/checkAuth', checkAuth)
app.post('/userHandling/loginUser', jsonParser, loginUser)

//Post Handling Endpoints
app.post('/postHandling/createPost/', jsonParser, createPost)
app.delete('/postHandling/deletePost', jsonParser, deletePost)
