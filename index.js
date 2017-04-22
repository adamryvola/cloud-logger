'use strict';

const request = require('request');

/**
 * Log levels
 *
 * 1 - cloud
 * 2 - console
 * 3 - cloud and console
 */

class Logger {

    constructor(connection='', options={}) {
        this.connection = connection;
        this.options = options;
    }

    console(data) {
        console.log(data);
    }

    warn(data) {
        console.warn(data);
    }

    warning(data) {
        console.warn(data);
    }

    cloud(data) {
        if (this.connection !== '') {
            request.post({uri:this.connection, json:true}, data, (err, res, body) => {
                if (err) {
                    console.log('ERR ON POST LOG', err);
                } else {
                    console.log('SUCCESS POST LOG');
                }

            })
        } else {
            console.warn('Cloud logger -> no cloud connection');
        }
    }

    requestMiddleware(req, res, next) {
        console.log('Request-logger middleware');
        next();
    }
}

const logger = new Logger();
console.log(' =>> Cloud-logger initialized <<=');

module.exports = (connection, options) => {
    logger.connection = connection;
    logger.options = options;
    return logger;
};
module.exports.logger = logger;