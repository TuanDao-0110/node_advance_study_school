const options = {
    host: "127.0.0.1",
    // host: 'localhost',
    user: "tuan",
    password: "Milan123@",
    port: 3306,
    // allowPublicKeyRetrieval: true,
    database: 'employeeDb'
}

let result

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection(options);

const testA = async () => {
    result = await connection.promise().query('select * from employee').then(([rows, fields]) => {
        return rows
    })
    // .catch(res => res)
    // .then(() => connection.end());
    console.log(result)
}


testA()

