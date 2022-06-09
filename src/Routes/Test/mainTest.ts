import express from 'express'
const router = express.Router();


export const mainTest = router.get('/test', async(req, res)=> {
    res.send("Yo")
})