import { PoolConfig } from "mysql"

export const BACKEND_PORT:number = 80
export const CONSOLE_LOG_API: boolean = true
export const SESSION_SECRET:string = "This is the secret"

//Database config
export const CREATE_NEW_DATABASE = false
export const DATABASE_CONFIG = {
    connectionLimit: 5000,
    user: 'root',
    password: 'admin',
    database: 'notTwitter',
    host: 'localhost'
}

//Front end consts
export const FRONTEND_SERVER_URL:String = 'localhost'
export const FRONTEND_SERVER_PORT:String = 'localhost'
export const USING_SSL:boolean = false

