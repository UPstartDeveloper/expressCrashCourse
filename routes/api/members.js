const express = require('express');
const router = express.Router();
// fake database of users
const members = require('../../Members');

// Make a simple RESTful API, that GETS all members
router.get('/', (req, res) => res.json(members));

// GET One member
router.get('/:id', (req, res) => {
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

module.exports = router;
