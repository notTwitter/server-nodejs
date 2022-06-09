import express from 'express'
import session from 'express-session'
import cors from 'cors'
import bodyParser from 'body-parser'
import { BACKEND_PORT, FRONTEND_SERVER_PORT, FRONTEND_SERVER_URL } from './backend.config'

//Route Imports
import * as Tests from './Routes/Test/tests'

//Set up
const app = express()
const jsonParser = bodyParser.json();
app.listen(BACKEND_PORT, () => {
    console.log(`App running on port ${BACKEND_PORT}`)
})

//Middleware
app.use(jsonParser);
app.use(cors({
    origin: `${FRONTEND_SERVER_URL}:${FRONTEND_SERVER_PORT}`,
    credentials: true
}))

//Test Endpoints
app.get('/serverTest', Tests.serverTest)