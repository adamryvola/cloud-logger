## Cloud-logger

Send and save your logs in cloud.

## Code Example

```
const logger = require('cloud-logger')('my-logger-server.com', {protocol: 'ws', level: 1})
logger.log({type: 'MY_AWESOME_LOG', message: 'I use cloud-logger!'});
```

## Motivation

Often all you need is simple flexible logger that saves everything in your own storage.

## Installation

```npm install cloud-logger --save```

## API Reference

#### Constructor

##### connection

String with url - connection to cloud-log-server. e.g. https://gile-log.herokuapp.com/

##### options

Object with following possible attributes

| Name          | Default value | Description  |
| ------------- |:-------------:| ------------:|
| callback      | -             | this function will be called after data is logged, arguments are (data,error) |
| callbackTypes | []            | array of string, is logged message contains attribute type, that is in this array, callback function will be called |
| protcol       | ws            | protocol used for posting logs, possible values are 'ws' for websockets and 'http' for standard rest request |
| level         | 1             | possible values are 1 - cloud only, 2 - cloud and console, 3 - console only |

#### log(data)

This method sends data to cloud-logger service. Data have to be JSON object. 

## Tests

```npm run test```

## License

GPL-3.0