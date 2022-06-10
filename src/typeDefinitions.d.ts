import SessionData from 'express-session'


 declare module 'express-session' {
    interface SessionData {
        userName: String | undefined,
        isLoggedIn: undefined,
    }
}