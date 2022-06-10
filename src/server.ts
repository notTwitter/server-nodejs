import express from 'express'
import session from 'express-session'
import cors from 'cors'
import bodyParser from 'body-parser'
import mysql from 'mysql'
import { BACKEND_PORT, DATABASE_CONFIG, FRONTEND_SERVER_PORT, FRONTEND_SERVER_URL, SESSION_SECRET } from './backend.config'
import { DATABASE_CONNECTION_TEST_QUERY } from './Database/databaseQueries'

//Route Imports
import * as Tests from './Routes/Test/tests'

//Server set up
const app = express()
const jsonParser = bodyParser.json();
app.listen(BACKEND_PORT, () => {
    console.log(`App running on port ${BACKEND_PORT}`)
})

//Database Init
const db = mysql.createPool(DATABASE_CONFIG)
db.query(DATABASE_CONNECTION_TEST_QUERY, (err, result, fields)=>{
    if(err) throw err;
    console.log("Connection to MySQL established")
})


//Middleware
app.use(jsonParser);
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