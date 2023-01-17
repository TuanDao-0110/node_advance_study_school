'use strict'

const mariadb = require("mariadb")

// mariadb.createConnection({ host: 'localhost', user: 'tuan', password: 'Milan123@' })
//     .then(conn => {
//         conn.query("employeedb",)
//             .then(rows => {
//                 console.log(rows); // [{ "1": 1 }]
//                 conn.end();
//             })
//             .catch(err => {
//                 //handle query error
//             });
//     })
//     .catch(err => {
//         //handle connection error
//     });

// 1. run Test A
const testA = async () => {
    const options = {
        host: '127.0.0.1',
        // host:'localhost',
    // allowPublicKeyRetrieval: true,
        port: 3306,
        user: 'tuan',
        password: 'Milan123@',
        database: 'employeeDb'
    }
    const connection = await mariadb.createConnection(options)
    // use sql to get some result:
    // 1.  first way to get it return data as array array
    let result = await connection.query('select * from employee')
    // 
    console.log('******* 1 result *********')
    // delete result.meta
    // console.log(result)
    console.log(Object.values(result))
    // 2. way to get it
    result = await connection.query({
        rowsAsArray: true, sql: 'select * from employee'
    })
    console.log('******* 2 result *********')

    delete result.meta;
    console.log(result)
    // close connection
    console.log('******* 3 result *********')
    result = await connection.query(
        'select * from employee where id=?', [1]


    )
    delete result.meta;
    console.log(result)
    connection.end()
}

testA()