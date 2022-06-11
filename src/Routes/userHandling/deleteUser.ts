import express from 'express'
import { TextColors } from '../../Assets/init'
import { CONSOLE_LOG_API } from '../../backend.config'
import { queryDB } from '../../Database/databaseFunctions'
import { checkExistsQueryGenerator } from '../../Database/databaseQueries'
import { authMiddleware } from '../../Handlers/auth'
const router = express.Router()

//Not checking password here, because it uses the auth middleware.

export const deleteUser = router.delete('/userHandling/deleteUser', authMiddleware, async(req, res) => {
    CONSOLE_LOG_API? console.log(`${TextColors.FgBlue}${TextColors.Exit}`, "Requested /deleteUser") : null
    const userName:string = req.body.userName

    //If requested user != current user, forbid
    console.log(req.session.userName)
    if(userName!=req.session.userName){
        CONSOLE_LOG_API? console.log(`${TextColors.FgRed}${TextColors.Exit}`,"Users are not the same. Aborting") : null
        res.status(401).send({
            success: false,
            differentUser: true
        })
    }else{

        //Checking whether the user exists
        let commandUserExists = checkExistsQueryGenerator(userName)
        const dbResultUserExists = await queryDB(commandUserExists)
        if(dbResultUserExists.length===0){
            CONSOLE_LOG_API? console.log(`${TextColors.FgRed}${TextColors.Exit}`,"User does not exist. Aborting") : null
            res.status(403).send({
                success: false, userExists: false
            }
        )}else{
            //If user exists, delete user & remove them from session data
            CONSOLE_LOG_API? console.log(`${TextColors.FgGreen}${TextColors.Exit}`,"User Exists. Proceeding") : null
            req.session.destroy
            let commandDeleteUser = deleteUserQueryGenerator(userName)
            const dbDeleteUserReponse = await queryDB(commandDeleteUser)
            res.status(200).send({
                success: true,
                userExists: true
            })
        }
    }

})

//Query Generators
const deleteUserQueryGenerator = (userName: string): string => {
    return `delete from userData where userName="${userName}"`
}