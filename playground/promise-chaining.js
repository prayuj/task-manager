require('../src/db/mongoose')
const User = require('../src/model/user.model')

User.findByIdAndUpdate('6049faf37248181e3ca06514', { age: 1 }).then(user => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then(count => {
    console.log(count)
}).catch(e => {
    console.log(e)
})