const express = require('express')
var cors = require('cors')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

require('./db/mongoose')

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app

