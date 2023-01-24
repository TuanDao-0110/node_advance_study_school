'use strict'

const { escapeId } = require("mysql")
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


const printWorker = (employees) => {
    for (const person of employees) {
        console.log(
            `${person.id
            }: ${person.firstname} ${person.lastname} ` + `Department: ${person.department}, Salary: ${person.salary}`
        )
    }
}

const getAll = async () => {
    try {
        const result = await db.doQuery('select * from employee')
        if (result.resultSet) {
            // console.log(result.queryResult)
            printWorker(result.queryResult)
        }
    } catch (error) {
        console.log(error)
    }
}


const getOne = async (id) => {
    try {
        const result = await db.doQuery('select * from employee where id=?', [id])
        if (result.queryResult.length > 0) {

            printWorker(result.queryResult)
        } else {
            console.log(`not employee found with ${id} `)
        }
    } catch (error) {
        console.log(error)
    }
}


const addEmployee = async (employee) => {
    try {
        const parameter = [
            employee.id,
            employee.firstname,
            employee.lastname,
            employee.department,
            employee.salary
        ];
        const sql = 'insert into employee values(?,?,?,?,?)'
        // https://mariadb.com/kb/en/connector-nodejs-pipelining/
        const status = await db.doQuery(sql, parameter)
        console.log(status)
    } catch (error) {
        console.log(error)
    }
}

const removeEmployee = async (id) => {
    try {
        const status = await db.doQuery('delete from employee where id=?', [id])
        console.log(status)
    } catch (error) {
        console.log(error)
    }
}


const updateEmployee = async (editedEmployee) => {
    try {
        const sql = 'update employee set firstname=?, lastname=?, department=?, salary=? where id=?'
        let parameter = [
            editedEmployee.firstname,
            editedEmployee.lastname,
            editedEmployee.department,
            editedEmployee.salary,
            editedEmployee.id,
        ]

        const status = await db.doQuery(sql, parameter)
        console.log(status)

    } catch (error) {
        console.log(error)
    }
}

const runProgram = async () => {
    console.log('*****1/ get all *****')
    await getAll()
    console.log('*****2/ get one *****')
    // await getOne(1)
    console.log('****** 3. add new employee******')
    // await addEmployee({
    //     id: 201,
    //     firstname: "duyen",
    //     lastname: 'tran',
    //     department: 'IT',
    //     'salary': 3000
    // })
    console.log('****** 4. remove  employee******')
    // await removeEmployee(201)
    console.log('****** edit. remove  employee******')
    await updateEmployee({ id: 200, lastname: 'tuan', firstname: 'dao', department: 'sale', salary: 4000 })

}



runProgram()


