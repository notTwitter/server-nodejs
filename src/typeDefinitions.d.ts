import SessionData from 'express-session'

//Session data
declare module 'express-session' {
    interface SessionData {
        userName: String | undefined,
        isLoggedIn: undefined,
    }
}

//User handling - new user
export interface InterfaceNewUser {
    userName: String,
    passWord: String
}