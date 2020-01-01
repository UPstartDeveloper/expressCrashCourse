const path = require('path');
// import our logger middleware
const logger = require('./middleware/logger');
// Basic Server Syntax in Express
const express = require('express');
const app = express();

// fake database of users
const members = require('./members')

// Make a simple RESTful API, that GETS all members
app.get('/api/members', (req, res) => res.json(members));

// GET One member
app.get('/api/members/:id', (req, res) => {
    // check to see if a member in the db has the requested id
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        // return the data if it exists
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        // otherwise, raise a 400 error (bad request)
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});

    }
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// give it a PORT to listen to
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
