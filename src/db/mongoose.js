const mongoose = require('mongoose')

const User = require('./model/user.model')
const Task = require('./model/task.model')


mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const me = new User({
    name: 'Olivia',
    email: 'mike@gmail.com',
    password: 'Test12345'
})

me.save().then(() => {
    console.log(me)
}).catch(error => {
    console.log(error)
})

