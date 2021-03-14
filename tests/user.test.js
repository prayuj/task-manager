const request = require('supertest')
const app = require('../src/app')
const mongoose = require('mongoose')
const User = require('../src/model/user.model')
const { userOneId, userOne, setupDatabase, closeDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)
afterAll(closeDatabase)

test('Should sign up new user', async () => {
    const response = await request(app).post('/users').send({
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "biqdbisndisniajsndsjnd"
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: "John Doe",
            email: "johndoe@gmail.com"
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('biqdbisndisniajsndsjnd')
})

test('Should log in existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send(userOne)
        .expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not log in non existing user', async () => {
    await request(app).post('/users/login').send({
        email: 'johndoe@gmail.com',
        password: 'test12345'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

})

test('Should not get profile for missing bearer token user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(400)

})

test('Should not get profile for unauthorized user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer THisIsAranDomJWT`)
        .send()
        .expect(401)

})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull

})

test('Should not delete account for unauthorized user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer THisIsAranDomJWT`)
        .send()
        .expect(401)

})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Jane Doe'
        }).expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Jane Doe')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Mumbai'
        }).expect(400)
})
