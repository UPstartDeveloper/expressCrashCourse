const express = require('express');
const router = express.Router();
const uuid = require('uuid');
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

// POST a new member
router.post('/', (req, res) => {
    // initialize a new object using the request data
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    // error handling
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email'});
    }
    // add the new Member to our models "db"
    members.push(newMember);
    // send back a response
    res.json(members);
});

// UPDATE a method
router.put('/:id', (req, res) => {
    // check to see if a member in the db has the requested id
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        // edit the member
        const updMember = req.body;
        // find the member
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                // send back a response
                res.json({ msg: 'Member updated', member });
            }
        });
    } else {
        // otherwise, raise a 400 error (bad request)
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});

    }
});

module.exports = router;
