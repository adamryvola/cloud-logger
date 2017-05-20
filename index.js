'use strict';
const request = require('request');
const io = require('socket.io-client');

/**
 * Log levels
 *
 * 1 - cloud
 * 2 - cloud and console
 * 3 - console
 */

class Logger {

    constructor(connection, options = {}) {

        this.connection = connection;
        this.callback = options.callback;
        this.callbackTypes = options.callbackTypes;
        this.options = options;

        this.localOnly = false;
        if (!connection) this.localOnly = true;

        if (!this.localOnly && (!this.options.protocol || this.options.protocol !== 'http')) {
            this.options.protocol = 'ws';
            this.socket = io(this.connection);
        }

        if (!this.options.level) {
            if (this.connection) {
                this.options.level = 1;
            } else {
                this.options.level = 3;
            }
        }
        if (this.localOnly && this.options.level !== 3) {
            this.options.level = 3;
            console.warn('[cloud-logger] logger is initialized for local use only, level=3');
        }
        console.log('[ =>> Cloud-logger initialized <<= ]');
    }

    log(data) {
        switch (this.options.level) {
            case 1:
                this.cloud(data);
                break;
            case 2:
                this.cloud(data);
                this.console(data);
                break;
            case 3:
                this.console(data);
                break;
        }
        if (this.callback && data.type && this.callbackTypes && this.callbackTypes.indexOf(data.type) > -1) {
            this.callback(data);
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
        if (this.options.protocol === 'http') {
            if (this.connection !== '') {
                request.post({url: this.connection, json: true, body: data});
            } else {
                console.warn('Cloud logger -> no cloud connection for http post request');
            }
        } else {
            this.socket.emit('POST_LOG', data);
        }
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

let logger = new Logger();

module.exports = (connection, options) => {
    logger = new Logger(connection, options);
    return logger;
};
module.exports.logger = logger;