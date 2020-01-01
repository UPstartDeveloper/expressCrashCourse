const path = require('path');
// import our logger middleware
const logger = require('./middleware/logger');
// Basic Server Syntax in Express
const express = require('express');
const app = express();

// create simple middleware, and init it in the app
app.use(logger);

// fake database of users
const members = require('./members')

// Make a simple RESTful API, that returns members
app.get('/api/members', (req, res) => res.json(members));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// give it a PORT to listen to
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
