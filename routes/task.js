const express = require('express');
const router = new express.Router();
const Todo = require('../models/todo');
const todos = [
    {
        id: 1,
        text: 'Go to the store'
    },
    {
        id: 2,
        text: 'Buy some milk',
    }
]

router.get('/todos', async (req, res) => {
    const allTodos = await Todo.find({});
    res.status(200).send(allTodos);
});

router.get('/todos/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const todo = await Todo.findOne({ _id });
        if (!todo) {
            return res.status(404).send();            
        }

        res.send(todo);
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/todos', async (req, res) => {
    const todo = new Todo(req.body);
    try {
        await todo.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch('/todos/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'completed'];
    const isAllowedToUpdate = updates.every((update) => allowedUpdates.includes(update));
    if (!isAllowedToUpdate) {
        return res.status(403).send({ error: 'Invalid updates.' });
    }
    
    const todo = await Todo.findOne({ _id })

    updates.forEach((update) => todo[update] = req.body[update]) // todo['name'] todo.name

    try {
        await todo.save();
        res.status(201).send(todo);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/todos/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const todo = await Todo.findOneAndDelete({ _id });

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