const express = require('express');
const router = new express.Router();
const Todo = require('../models/todo');
const auth = require('../middleware/auth');

router.get('/todos', auth, async (req, res) => {
    try {
        await req.user.populate({
            path: 'todos'
        });

        res.send(req.user.todos);
    } catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
});

router.get('/todos/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const todo = await Todo.findOne({ _id, owner: req.user._id });
        if (!todo) {
            return res.status(404).send();            
        }

        res.send(todo);
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/todos', auth, async (req, res) => {
    const todo = new Todo({
        ...req.body,
        owner: req.user._id,
    });
    try {
        await todo.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/todos/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'completed'];
    const isAllowedToUpdate = updates.every((update) => allowedUpdates.includes(update));
    if (!isAllowedToUpdate) {
        return res.status(403).send({ error: 'Invalid updates.' });
    }
    
    const todo = await Todo.findOne({ _id, owner: req.user._id })

    updates.forEach((update) => todo[update] = req.body[update]) // todo['name'] todo.name

    try {
        await todo.save();
        res.status(201).send(todo);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/todos/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const todo = await Todo.findOneAndDelete({ _id, owner: req.user._id });

        if (!todo) {
            return res.status(404).send({ error: 'Todo not found!' });
        }

        res.send({
            ...todo,
            deleted: true,
        });
    } catch (e) {
        res.status(500).send();
    }
});



module.exports = router;