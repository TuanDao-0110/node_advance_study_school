'use strict'

const { CODES, MESSAGES } = require('./statusCode')
const e = require('express')
const options = require("./databaseOptions.json")
const sql = require('./sqlStatement.json')
const Database = require('../database')

const getAllSql = sql.getAll.join(' ')
const getOneSql = sql.getOne.join(' ')
const insertSql = sql.insert.join(' ')
const updateSql = sql.update.join(' ')
const removeSql = sql.remove.join(' ')
const PRIMARY_KEY = sql.primaryKey

// data storage class
module.exports = class Datastorage {
    constructor() {
        this.db = new Database(options)
    }
    get CODES() {
        return CODES
    }
    getAll() {
        return new Promise(async (res, rej) => {
            try {
                const result = await this.db.doQuery(getAllSql)
                res(result.queryResult)
            } catch (error) {
                rej(MESSAGES.PROGRAM_ERROR(''))
            }
        })
    }// end getAll
    getOne(id) {
        return new Promise(async (res, rej) => {
            try {
                // check it exist
                if (!id) {
                    rej(MESSAGES.NOT_FOUND('----empty----'))
                } else {
                    const result = await this.db.doQuery(getOneSql, [id])
                    if (result.queryResult.length > 0) {
                        return res(result.queryResult[0])
                    } else {
                        return rej(MESSAGES.NOT_FOUND(id))
                    }
                }
            } catch (error) {
                rej(MESSAGES.PROGRAM_ERROR())
            }
        })

    }
    insert(employee) {
        return new Promise(async (res, rej) => {
            console.log(employee)
            try {
                if (!employee) {
                    return rej(MESSAGES.NOT_INSERTED())
                } else {
                    if (!employee[0]) {
                        return rej(MESSAGES.NOT_INSERTED())
                    }
                    else if (await this.db.doQuery(insertSql, employee)) {
                        return res(MESSAGES.INSERT_OK(employee[0]))
                    }
                }
            } catch (error) {
                console.log(error)
                rej(MESSAGES.NOT_INSERTED())
            }
        })
    }
    update(employee) {
        return new Promise(async (res, rej) => {
            try {
                if (!employee) {
                    console.log('here')
                    return rej(MESSAGES.NOT_UPDATED())
                } else {
                    const status = await this.db.doQuery(updateSql, employee)
                    if (status) {
                        return res(MESSAGES.UPDATE_OK(employee[0]))
                    } else {
                        return rej(MESSAGES.NOT_UPDATED())
                    }
                }
            } catch (error) {
                rej(MESSAGES.NOT_UPDATED())
            }
        })
    }
    remove(id) {

        return new Promise(async (res, rej) => {
            try {
                if (!id) {
                    return rej(MESSAGES.NOT_FOUND('---empty---'))

                }
                else {
                    const status = await this.db.doQuery(removeSql, [id])
                    if (status.queryResult.rowChanged > 0) {
                        return res(MESSAGES.REMOVE_OK(id))
                    } else {
                        return rej(MESSAGES.NOT_REMOVED(id))
                    }
                }

            } catch (error) {
                rej(MESSAGES.NOT_REMOVED(id))
            }

        })
    }
}
