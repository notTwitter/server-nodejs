
export const DATABASE_CONNECTION_TEST_QUERY = "select 1"

//Checks whether user exists
export const checkExistsQueryGenerator = (userName: string, passWord?: string): string => {
    if(passWord===undefined||null){
        return `select * from userData where userName="${userName}"`
    }
    return `select * from userData where userName="${userName}" and passWord="${passWord}"`
}