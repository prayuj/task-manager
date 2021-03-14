const express = require('express')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is running on port ' + port)
})

const Task = require('./model/task.model')
const User = require('./model/user.model')

const main = async () => {
    // const task = await Task.findById('604da7215296c22ef8330b44')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('604da6ad8867044edc8a6248')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()

