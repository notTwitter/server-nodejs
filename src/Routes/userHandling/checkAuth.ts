import express from 'express'
import { TextColors } from '../../Assets/init'
import { CONSOLE_LOG_API } from '../../backend.config'
const router = express.Router()

export const checkAuth = router.get('/userHandling/checkAuth', async(req, res) => {
    CONSOLE_LOG_API? console.log(`${TextColors.FgBlue}${TextColors.Exit}`, "Requested /checkAuth") : null
    if (req.session?.isLoggedIn != true){
        CONSOLE_LOG_API? console.log(`${TextColors.FgRed}${TextColors.Exit}`,"Users is not logged in.") : null
        res.status(200).send({
            success: true, 
            isLoggedIn: false
        })
    }
    if (req.session?.isLoggedIn === true){
        CONSOLE_LOG_API? console.log(`${TextColors.FgGreen}${TextColors.Exit}`,"User is logged in.") : null
        res.status(200).send({
            success: true, 
            isLoggedIn: true,
            userName: req.session.userName
        }) 
    }
})