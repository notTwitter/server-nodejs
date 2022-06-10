import express from 'express'
import session from 'express-session'
import cors from 'cors'
import bodyParser from 'body-parser'
import mysql from 'mysql'
import { BACKEND_PORT, DATABASE_CONFIG, FRONTEND_SERVER_PORT, FRONTEND_SERVER_URL, SESSION_SECRET } from './backend.config'
import { DATABASE_CONNECTION_TEST_QUERY } from './Database/databaseQueries'

//Route Imports
import * as Tests from './Routes/Test/tests'
import * as userHandling from './Routes/userHandling/registerUser'
import { cliSetup } from './Assets/init'

//CLI Set Up
cliSetup()
//Server Set Up
const app = express()
export const jsonParser = bodyParser.json();
app.listen(BACKEND_PORT, () => {
    console.log(`App running on port ${BACKEND_PORT}`)
})

//Database Init
export const DATABASE = mysql.createPool(DATABASE_CONFIG)
DATABASE.query(DATABASE_CONNECTION_TEST_QUERY, (err, result, fields)=>{
    if(err) throw err;
    console.log("Connection to MySQL established\n")
})


//Middleware
app.use(cors({
    origin: `${FRONTEND_SERVER_URL}:${FRONTEND_SERVER_PORT}`,
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
app.post('/userHandling/registerUser',jsonParser, userHandling.registerUser)