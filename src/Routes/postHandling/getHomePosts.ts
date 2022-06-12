import express from 'express'
import { queryDB } from '../../Database/databaseFunctions'
import { authMiddleware } from '../../Handlers/auth'
const router = express.Router()
//Until user relationships are created, the home feed will consists of everyones posts.

export const getHomePosts = router.get('/postHandling/getHomePosts',authMiddleware, async(req, res) => {
    const userName = req.session.userName
    //@ts-ignore -> userName is not undefined
    const commandGetHomePosts = getHomePostsQueryGenerator(userName)
    try{
        const postData = await queryDB(commandGetHomePosts)// -> postData is an array
        res.status(200).send({
            success: true,
            postData: postData
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            dataBaseError: true
        })
    }

    
})

//Query Generators
const getHomePostsQueryGenerator = (userName: string): string => {
    return `select * from postData order by dateTime`
}