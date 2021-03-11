const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(databaseName)

    // db.collection('users').updateOne({
    //     _id: new ObjectID("6047a3210b1a9229dcccfeaf")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then(result => {
    //     console.log(result)
    // }).catch(error => {
    //     console.log(error)
    // })

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }
    ).then(res => {
        console.log(res.matchedCount)
    }).catch(err => {
        console.log('Error updating!')
    })


})