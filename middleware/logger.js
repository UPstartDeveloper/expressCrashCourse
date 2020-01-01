// Moment - Node module forn handling date timeout
const moment = require('moment');

// create simple middleware, and init it in the app
const logger = (req, res, next) => {
    // log the url of the request, and use moment to display when it was sent
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
};

module.exports = logger;
