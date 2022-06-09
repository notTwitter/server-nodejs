import express from 'express'
import session from 'express-session'
import cors from 'cors'
//@ts-ignore
import { BACKEND_PORT } from '../backend.config'

//Set up
const app = express()
app.listen(BACKEND_PORT, () => {
    console.log(`App running on port ${BACKEND_PORT}`)
})
