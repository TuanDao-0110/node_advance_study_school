'use strict'

const sql = require('./sqlStatement.json')


const getAllSql = sql.getAll.join(' ')
const getOneSql = sql.getOne.join(' ')
const insertSql = sql.insert.join(' ')
const updateSql = sql.update.join(' ')
const removeSql = sql.remove.join(' ')
const PRIMARY_KEY = sql.primaryKey


console.log(insertSql)
console.log(getOneSql)
console.log(getAllSql)