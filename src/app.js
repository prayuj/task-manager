const express = require('express')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

require('./db/mongoose')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app

