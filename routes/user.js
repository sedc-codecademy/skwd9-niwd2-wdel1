const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', (req, res) => {
    const user = req.body; 
    // const foundUser = db.findUser(user);
    // const tokens = generateToken();

    // res.send({
    //     user: foundUser,
    //     token,
    // })
})

router.post('/users/logout', (req, res) => {
    // const user = req.body;
    // delete user.token;

    // user.save();
});

router.get('/users/me', (req, res) => {
    // const user = db.find(req.body);
    // res.status(200).send(user);
});

module.exports = router;