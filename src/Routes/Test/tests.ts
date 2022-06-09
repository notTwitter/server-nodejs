import express from 'express'
import { CONSOLE_LOG_API } from '../../backend.config';
const router = express.Router();


export const serverTest = router.get('/serverTest', async(req, res)=> {
    CONSOLE_LOG_API? console.log("Requested /serverTest") : null
    res.send({
        server: "notTwitter",
        connection: true
    })
})