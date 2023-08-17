const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const route = express.Router()

route.route('/signup')
    .post(authController.signup)
route.route('/login')
    .post(authController.login)
    
route.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

route.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = route