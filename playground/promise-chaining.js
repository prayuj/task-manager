require('../src/db/mongoose')
const User = require('../src/model/user.model')

// User.findByIdAndUpdate('6049faf37248181e3ca06514', { age: 1 }).then(user => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then(count => {
//     console.log(count)
// }).catch(e => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('6049faf37248181e3ca06514', 0).then(count => {
    console.log(count)
}).catch(e => console.log(e))