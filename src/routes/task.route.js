const Router = require('express').Router()

const {
    createUser,
    getUser
} = require('../controller/task.controller')

Router.post('/user/add', createUser)
Router.get('/user', getUser)
module.exports = Router