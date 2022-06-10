import { DATABASE } from "../server"

export const queryDB = (command:string):Promise<any | any> => {
    return new Promise((resolve, reject) => {
        try{
            DATABASE.query(command, (err, results, fields)=> {
                resolve(results)
            })
        }catch{
            reject({error: true})
        }
    })
}