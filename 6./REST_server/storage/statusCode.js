'use strict'

const CODES = {
    PROGRAM_ERROR: 0,
    NOT_FOUND: 1,
    INSERT_OK: 2,
    NOT_INSERTED: 3,
    UPDATE_OK: 4,
    NOT_UPDATED: 5,
    REMOVE_OK: 6,
    NOT_REMOVED: 7,
    KEY_DO_NOT_MATCH: 8
}


const MESSAGES = {
    PROGRAM_ERROR: () => ({
        message: "Sorry! Error in our program",
        code: CODES.PROGRAM_ERROR,
        type: "error",
    }),
    NOT_FOUND: (key, value) => ({
        message: `No resource found with key ${key} - ${value}`,
        code: CODES.NOT_FOUND,
        type: "info",
    }),
    INSERT_OK: (key, value) => ({
        message: `Resource with key ${key} - ${value} was inserted`,
        code: CODES.INSERT_OK,
        type: "info",
    }),
    NOT_INSERTED: () => ({
        message: `Resource was not insert`,
        code: CODES.NOT_INSERTED,
        type: "error",
    }),
    UPDATE_OK: (key, value) => ({
        message: `resource key: ${key} - value ${value} have been updated`,
        code: CODES.UPDATE_OK,
        type: 'info'
    }),
    NOT_UPDATED: () => ({
        message: `data was not updated`,
        code: CODES.NOT_UPDATED,
        type: 'error'
    }),
    REMOVE_OK: (key, value) => ({
        message: `resource key: ${key} - ${value} removed`,
        code: CODES.REMOVE_OK,
        type: 'info'
    }),
    NOT_REMOVED: (key, value) => ({
        message: `emplyee key:${key} - ${value} not remove`,
        code: CODES.NOT_REMOVED,
        type: 'error'
    }),
    KEY_DO_NOT_MATCH: (key, keyInResource) => ({
        message: `The key:${key} of givin resource doesn't match the given key ${keyInResource}`,
        code: CODES.KEY_DO_NOT_MATCH,
        type: 'error'
    })
};

module.exports = { CODES, MESSAGES }