'use strict'
const Database = require('./database')
const printMessage = message => console.log(message)
const printStatement = statement => printMessage(`${statement};`)
const printError = message =>
    printMessage(`${'#'.repeat(20)} Error ${'#'.repeat(20)} \n` + `
${message}\n${'#'.repeat(47)}`)

// let createStatementFile = './createStatement.json'
let createStatementFile = './dogCreateStatements.json'



if (process.argv.length > 2) {
    adminPass = process.argv[2]
    if (process.argv.length > 3) {
        createStatementFile = `./${process.argv[3]}`
    }
}

const createDb = async (createStatement, adminPass) => {
    const options = {
        host: createStatement.host,
        port: createStatement.port,
        user: createStatement.admin,
        password: adminPass,
        "allowPublicKeyRetrieval": true
    }
    const DEBUG = createStatement.debug
    const db = new Database(options)
    // 1.create user with this format: 
    // 'jane'@'localhost'
    const user = `'${createStatement.user}'@'${createStatement.host}'`
    const dropDtabaseSql = `drop database if exists ${createStatement.database}`
    const createDatabaseSql = `create database ${createStatement.database}`
    const dropUserSql = `drop user if exists ${user}`
    const createUserSql = `create user if not exists ${user} ` + `identified by '${createStatement.userpassword}'`
    const grantPrivilegesSql =
        `grant all privileges on ${createStatement.database}.* to ${user}`
    try {
        await db.doQuery(dropDtabaseSql)
        if (DEBUG) {
            printStatement(dropDtabaseSql)
        }
        await db.doQuery(createDatabaseSql)
        if (DEBUG) {
            printStatement(createDatabaseSql)
        }
        if (createStatement.dropUser) {
            await db.doQuery(dropUserSql)
            if (DEBUG) {
                printStatement(dropUserSql)
            }
        }
        await db.doQuery(createUserSql)
        if (DEBUG) {
            printStatement(createUserSql)
        }
        await db.doQuery(grantPrivilegesSql)
        if (DEBUG) {
            printStatement(grantPrivilegesSql)
        }
        for (let table of createStatement.tables) {
            if (table.columns && table.columns.length > 0) {
                const createTableSql = `create table ${createStatement.database}.${table.tableName} (` +
                    `\n\t${table.columns.join(',\n\t')}` +
                    `)`
                await db.doQuery(createTableSql)
                if (DEBUG) {
                    printStatement(createTableSql)
                }
                if (table.data && table.data.length > 0) {
                    const rows = []
                    for (const data of table.data) {
                        const insertRowSql = `insert into ${createStatement.database}.${table.tableName} ` +
                            `values(${Array(data.length).fill('?').join(', ')})`
                        rows.push(db.doQuery(insertRowSql, data))
                    }
                    // Promise all 
                    await Promise.all(rows)
                    if (DEBUG) printMessage('data added')
                }
                else {
                    if (DEBUG) {
                        printMessage('data missing')
                    }
                }
            } else {
                if (DEBUG) {
                    printMessage('Tables columns missing, Table not created')
                }
            }
        }
    } catch (error) {
        printError(error)
    }
}

// console.log(createStatementFile, adminPass)
try {
    createDb(require(createStatementFile), 'Bongda123@')
} catch (error) {
    printError(error)
}
