const express = require('express')
const router = new express.Router()
const User = require('../model/user.model')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (error) {
        res.status(400).send()
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user)
            return res.status(404).send()
        res.send(user)
    } catch (error) {
        res.status(500).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    const _id = req.params.id

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }
    else {
        try {
            const user = await User.findById(_id)
            updates.forEach((update) => user[update] = req.body[update]
            )
            await user.save()
            if (!user) {
                return res.status(404).send()
            }
            res.send(user)

        } catch (error) {
            return res.status(400).send(error)
        }
    }

})

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.send(404).send()
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router