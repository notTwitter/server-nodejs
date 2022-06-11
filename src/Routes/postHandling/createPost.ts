import express from 'express'
import { TextColors } from '../../Assets/init'
import { CONSOLE_LOG_API } from '../../backend.config'
import { queryDB } from '../../Database/databaseFunctions'
import { authMiddleware } from '../../Handlers/auth'
const router = express.Router()

export const createPost = router.post('/postHandling/createPost',authMiddleware, async(req, res) => {
    CONSOLE_LOG_API? console.log(`${TextColors.FgBlue}${TextColors.Exit}`, "Requested /createPost") : null
    const userName:string | undefined = req.session.userName
    //We know that this endpoint wont' be reached unless it goes throught the auth middleware => means req.session.userName is DEFINITELY not undefine
    //@ts-ignore
    const commandCreatePost = createPostQueryGenerator(userName, req.body.postContent)
    try{
        CONSOLE_LOG_API? console.log(`${TextColors.FgGreen}${TextColors.Exit}`,"Successfully added post.") : null
        await queryDB(commandCreatePost)
        res.status(200).send({
            success: true
        })
    }catch(err){
        CONSOLE_LOG_API? console.log(`${TextColors.FgRed}${TextColors.Exit}`,"Database error.") : null
        res.status(500).send({
            success: false
        })
    }
})

//Query Generator
const createPostQueryGenerator = (userName: string, postContent:string):string => {
    return `insert into postData (userName, postContent) values ("${userName}","${postContent}")`
}