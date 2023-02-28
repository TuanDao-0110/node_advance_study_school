'use strict'

const Database = require("./database")
const options = require('./databaseOptions.json')
const sql = require('./sqlStatement.json')
const { toInsertArray, toUpdateArray } = require('./parameterArray')
const { CODES, MESSAGES } = require('./statusCode')


const getAllSql = sql.getAll.join(' ')
const getSql = sql.get.join(' ')
const insertSql = sql.insert.join(' ')
const updateSql = sql.update.join(' ')
const removeSql = sql.remove.join(' ')
const PRIMARY_KEY = sql.primaryKey

// console.log(getAllSql)
// console.log(getSql)
// console.log(insertSql)
// console.log(updateSql)
// console.log(removeSql)
// console.log(PRIMARY_KEY)


module.exports = class DataStorage {
    constructor() {
        this.db = new Database(options)
    }
    get CODES() {
        return CODES
    }
    get resource() {
        return sql.resource
    }
    getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.db.doQuery((getAllSql))
                resolve(result.queryResult)
            } catch (error) {
                console.log(error) //debug
                reject(MESSAGES.PROGRAM_ERROR())
            }
        })
    }//end of getAll
    get(key) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.db.doQuery(getSql, [key])
                if (result.queryResult.length > 0) {
                    resolve(result.queryResult)
                } else {
                    resolve(MESSAGES.NOT_FOUND(PRIMARY_KEY, key))
                }
            } catch (error) {
                console.log(error) //debug
                reject(MESSAGES.PROGRAM_ERROR())
            }
        })
    }// end of get 
    insert(resourceObject) {

        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.db.doQuery(insertSql, toInsertArray(resourceObject))
                resolve(MESSAGES.INSERT_OK(PRIMARY_KEY, resourceObject[PRIMARY_KEY]))
            } catch (error) {
                console.log(error) //debug
                reject(MESSAGES.NOT_INSERTED())
            }
        })
    }
    update(key, resourceObject) {
        return new Promise(async (resolve, reject) => {
            try {
                if (key && resourceObject) {
                    if (resourceObject[PRIMARY_KEY] !== key) {
                        reject(MESSAGES.KEY_DO_NOT_MATCH(resourceObject[PRIMARY_KEY], key))
                    }
                    const resultGet = await this.db.doQuery(getSql, [key])
                    if (resultGet.queryResult.length > 0) {
                        const result = await this.db.doQuery(updateSql, toUpdateArray(resourceObject))
                        if (result.queryResult.rowsChanged === 0) {
                            resolve(MESSAGES.NOT_UPDATED())
                        } else {
                            resolve(MESSAGES.UPDATE_OK(PRIMARY_KEY, resourceObject[PRIMARY_KEY]))
                        }
                    }
                    else {
                        this.insert(resourceObject)
                            .then(status => resolve(status))
                            .catch(
                                err => reject(err)
                            )
                    }

                } else {
                    resolve(MESSAGES.NOT_UPDATED())
                }
            } catch (error) {
                console.log(error) //debug
                reject(MESSAGES.PROGRAM_ERROR())
            }
        })
    }
    remove(key) {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.get(key)
                if (data.code === CODES.NOT_FOUND) {
                    return resolve(MESSAGES.NOT_FOUND(PRIMARY_KEY, key))
                }
                else {
                    const result = await this.db.doQuery(removeSql, [key])
                    if (result.queryResult.rowChanged === 0) {
                        resolve(MESSAGES.NOT_REMOVED(PRIMARY_KEY, key))
                    } else {
                        resolve(MESSAGES.REMOVE_OK(PRIMARY_KEY, key))
                    }
                }
            } catch (error) {
                console.log(error) //debug
                reject(MESSAGES.NOT_REMOVED())
            }
        })
    }
}