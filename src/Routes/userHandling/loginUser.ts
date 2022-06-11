import express from 'express'
import { TextColors } from '../../Assets/init'
import { CONSOLE_LOG_API } from '../../backend.config'
import { queryDB } from '../../Database/databaseFunctions'
import { checkExistsQueryGenerator } from '../../Database/databaseQueries'
import { InterfaceNewUser } from '../../typeDefinitions'
const router = express.Router()

export const loginUser = router.post('/userHandling/loginUser', async(req, res)=> {
    CONSOLE_LOG_API? console.log(`${TextColors.FgBlue}${TextColors.Exit}`, "Requested /loginUser") : null
    const userDetails: InterfaceNewUser = req.body
    if(userDetails.passWord != null || undefined){
        const commandCheckExists = checkExistsQueryGenerator(userDetails.userName, userDetails.passWord)
        const databaseResults = await queryDB(commandCheckExists)

        if(databaseResults.length===1){
            CONSOLE_LOG_API? console.log(`${TextColors.FgGreen}${TextColors.Exit}`, "User has been logged in.") : null
            //Setting up the sesion
            req.session.userName = userDetails.userName
            req.session.isLoggedIn = true
            res.send({
                success: true,
                isLoggedIn: true,
                passWordCorrect: true,
                userName: databaseResults[0].userName
            })
        }
        if(databaseResults.length === 0){
            CONSOLE_LOG_API? console.log(`${TextColors.FgRed}${TextColors.Exit}`, "Incorrect username or password.") : null
            res.send({
                success: false,
                isLoggedIn: false,
            })
        }
    }else{
        CONSOLE_LOG_API? console.log(`${TextColors.FgRed}${TextColors.Exit}`, "Password was not provided.") : null
        res.send({
            success: false,
            isLoggedIn: false
        })
    }
})
