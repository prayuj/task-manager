require('../src/db/mongoose')
const Task = require('../src/model/task.model')

const deleteTaskAndCount = async (id, completed) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed })
    return count
}

deleteTaskAndCount('604b28a79eb1ce236c3ae7b4', false)
    .then(count => console.log(count))
    .catch(e => console.log(e))