import express from 'express'
import { TextColors } from '../../Assets/init'
import { CONSOLE_LOG_API } from '../../backend.config'
import { queryDB } from '../../Database/databaseFunctions'
import { checkExistsQueryGenerator } from '../../Database/databaseQueries'
import { InterfaceNewUser } from '../../typeDefinitions'
const router = express.Router()


export const registerUser = router.post('/userHandling/registerUser', async(req, res) => {
    
    CONSOLE_LOG_API? console.log(`${TextColors.FgBlue}${TextColors.Exit}`,"Requested /registerUser") : null
    const newUserDetails:InterfaceNewUser = req.body
    let command = checkExistsQueryGenerator(newUserDetails.userName, newUserDetails.passWord)
    const dbResult = await queryDB(command)

    //If a result exists => user already exists
    if(dbResult.length>=1){
        CONSOLE_LOG_API? console.log(`${TextColors.FgRed}${TextColors.Exit}`,"User Already Exists. Aborting.") : null
        res.status(403).send({
            success: false,
            userAlreadyExists: true,
            passWordCorrect: true
        })
    }

    //Else we can add the user to the database
    else{
        CONSOLE_LOG_API? console.log(`${TextColors.FgGreen}${TextColors.Exit}`, "User Does Not Exist. Proceeding.") : null
        let command = addUserQueryGenerator(newUserDetails.userName, newUserDetails.passWord)
        await queryDB(command)

        //Initializing the session
        req.session.isLoggedIn = true
        req.session.userName = newUserDetails.userName

        res.status(200).send({
            success: true,
            userAlreadyExists: false
        })
    }
})

//Query Generators
const addUserQueryGenerator = (userName: string, passWord: string): string => {
    return `insert into userData (userName, passWord) values ("${userName}", "${passWord}")`
}