const Router = require('express').Router()

const {
    createUser,
    getUser,
    activeToken

} = require('../controller/task.controller')
Router.post('/user/auth', createUser)
Router.get('/user/auth/activateAccount', activeToken)
Router.get('/user', getUser)
module.exports = Router