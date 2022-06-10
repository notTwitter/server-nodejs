
export const DATABASE_CONNECTION_TEST_QUERY = "select 1"

//Common 
export const checkExistsQueryGenerator = (userName: string, passWord?: string): string => {
    if(passWord===undefined||null){
        return `select * from userData where userName="${userName}"`
    }
    return `select * from userData where userName="${userName}" and passWord="${passWord}"`
}