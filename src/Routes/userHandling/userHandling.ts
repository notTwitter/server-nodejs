//Functions -> Register user, Login user, Check isLoggedIn user
import express from 'express'
import session from 'express-session'
import { CONSOLE_LOG_API } from '../../backend.config'
import { InterfaceNewUser } from '../../typeDefinitions'
const router = express.Router()

//Test database
const users: InterfaceNewUser[] = []

export const registerUser = router.post('/userHandling/registerUser', async(req, res) => {
    CONSOLE_LOG_API? console.log("Requested /registerUser") : null
    const newUserDetails:InterfaceNewUser = req.body.newUserDetails
    users.push(newUserDetails)
    console.log(users)
    res.send({
        success: true
    })
})

