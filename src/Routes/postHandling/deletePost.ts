import express from 'express'
import { TextColors } from '../../Assets/init'
import { CONSOLE_LOG_API } from '../../backend.config'
import { queryDB } from '../../Database/databaseFunctions'
import { authMiddleware } from '../../Handlers/auth'
const router = express.Router()

export const deletePost = router.delete('/postHandling/deletePost',authMiddleware, async(req, res)=> {
    CONSOLE_LOG_API? console.log(`${TextColors.FgBlue}${TextColors.Exit}`, "Requested /deletePost") : null
    const userName = req.session.userName
    const postID:number = req.body.postID
    //@ts-ignore -> we are sure that userName is not undefined as the request goes through the auth middleware
    const commandDeleteUser = deletePostQueryGenerator(userName, postID)
    /*
    *Note: There is no need to confirm the username again as the database query uses an *and* condition. The post will only be deleted if the session username is equal to the actual username.
    */
    try{
        const dbResponse = await queryDB(commandDeleteUser)
        if(dbResponse.affectedRows===1){
            CONSOLE_LOG_API? console.log(`${TextColors.FgGreen}${TextColors.Exit}`, "Post will be deleted.") : null
            res.status(200).send({
                success: true,
                postExisted: true,
            })
        }else{
            CONSOLE_LOG_API? console.log(`${TextColors.FgRed}${TextColors.Exit}`, "No such post exists.") : null
            res.status(404).send({
                success: false,
                postExisted: false,
            })
        }
    }
    catch(e){
        console.log(e)
        res.status(404).send({
            success: false,
            serverError: true
        })
    }

})

//Query Generator
const deletePostQueryGenerator = (userName: string, postID:number): string => {
    return `delete from postData where userName="${userName}" and postID=${postID}`
}