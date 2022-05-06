const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require("../../Members");


// gets all members
router.get('/', (req, res) => {
    res.json(members);
});

// get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
     res.json(members.filter(member => member.id === parseInt(req.params.id)));

    } else {
        res.status(404).json ({ msg: `No member with the id of ${req.params.id}` });
    }
});

// create a member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    }

    if (!newMember.name || !newMember.email){
        return res.status(404).json({ msg: 'Please include a name and the email' });
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/')
});

// update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
      const updatedMember = req.body;
      members.forEach(member => {
          if (member.id === parseInt(req.params.id)){
            member.name = updatedMember.name ? updatedMember.name : member.name;
            member.email = updatedMember.email ? updatedMember.email : member.email;

            res.json({ msg: 'Member update', member });

          }
      });

    } else {
        res.status(404).json ({ msg: `No member with the id of ${req.params.id}` });
    }
});

// delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
     res.json({ msg: 'Member deleted',
                 members: members.filter(member => member.id !== parseInt(req.params.id))
    });

    } else {
        res.status(404).json ({ msg: `No member with the id of ${req.params.id}` });
    }
});

module.exports = router;