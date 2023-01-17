const Database = require("./database")

const options = {
    host: '127.0.0.1',
    // host:'localhost',
    // allowPublicKeyRetrieval: true,
    port: 3306,
    user: 'tuan',
    password: 'Milan123@',
    database: 'employeeDb'
}

const db = new Database(options)
const testA = async () => {
    try {
        // 1. get result from employee
        // const result = await db.doQuery("insert into employee values(?,?,?,?,?)", [123, "Joe", "Dan", "It", 4000]);
        const result = await db.doQuery('select * from employee')
        const { resultSet, queryResult } = result
        console.log(result)

        // const deleteResult = await db.doQuery('delete from employee where firstname=?',['tuan'])
        // console.log(deleteResult)



    } catch (error) {
        console.log(error)

    }
}

testA()