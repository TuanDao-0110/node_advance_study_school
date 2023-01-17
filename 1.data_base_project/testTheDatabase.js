'use strict'

const Database = require("./database")

const options = {
    host: '127.0.0.1',
    // host:'localhost',
    allowPublicKeyRetrieval: true,
    port: 3306,
    user: 'tuan',
    password: 'Milan123@',
    database: 'employeeDb'
}


const db = new Database(options)


const getAll = async () => {
    try {
        const result = await db.doQuery('select * from employee')
        if (result.resultSet) {
            console.log(result.queryResult)
        }
    } catch (error) {
        console.log(error)
    }
}

const runProgram = async ()=> { 
    await getAll()
}


runProgram()
