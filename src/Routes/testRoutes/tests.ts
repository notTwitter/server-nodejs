import express from 'express'
import { TextColors } from '../../Assets/init';
import { CONSOLE_LOG_API } from '../../backend.config';
import { authMiddleware } from '../../Handlers/auth';
const router = express.Router();


export const serverTest = router.get('/serverTest', async(req, res)=> {
    CONSOLE_LOG_API? console.log(`${TextColors.FgBlue}${TextColors.Exit}`,"Requested /serverTest") : null
    res.send({
        server: "notTwitter",
        connection: true
    })
})

export const authTest = router.get('/authTest', authMiddleware, async(req, res) => {
    CONSOLE_LOG_API? console.log(`${TextColors.FgBlue}${TextColors.Exit}`,"Requested /authTest") : null
    res.send({
        accessDenied: false
    })
})