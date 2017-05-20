'use strict';
const request = require('request');
import io from 'socket.io-client';

/**
 * Log levels
 *
 * 1 - cloud and console
 * 2 - cloud
 * 3 - console
 */

class Logger {

    constructor(connection = '', options = {}) {
        this.socket = io('https://gile-log.herokuapp.com');
        this.connection = connection;
        this.options = options;
        if (!this.options.level) {
            this.options.level = 3;
        }
    }

    log(data) {
        switch (this.options.level) {
            case 1:
                this.cloud(data);
                this.console(data);
                break;
            case 2:
                this.cloud(data);
                break;
            case 3:
                this.console(data);
                break;
        }
    }

    console(data) {
        console.log(data);
    }

    warn(data) {
        this.warning(data);
    }

    warning(data) {
        console.warn(data);
    }

    cloud(data) {
        /*
        if (this.connection !== '') {
            request.post({url: this.connection, json: true, body: data});
        } else {
            console.warn('Cloud logger -> no cloud connection');
        }
        */
        this.socket.emit('POST_LOG', {client: 'zadek', message: 'muj prvni log'});
    }

    requestMiddleware(req, res, next) {
        this.cloud(req);
        next();
    }

    socketMiddleware(socket, next) {
        this.cloud(socket.request);
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