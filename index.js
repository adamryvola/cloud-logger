'use strict';

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
            //TODO -> send to cloud
        } else {
            console.warn('Cloud logger -> no cloud connection');
        }
    }

    requestMiddleware(req, res, next) {
        console.log('Request-logger middleware');
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