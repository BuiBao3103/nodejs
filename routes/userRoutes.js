const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const route = express.Router()

route.route('/signup')
    .post(authController.signup)
route.route('/login')
    .post(authController.login)

route.route('/forgotPassword')
    .post(authController.forgotPassword)
route.route('/resetPassword/:token')
    .patch(authController.resetPassword)
route.route('/me')
    .get(authController.protect,
        userController.getMe,
        userController.getUser)
route.route('/updateMyPassword')
    .patch(authController.protect,
        authController.updatePassword)
route.route('/updateMe')
    .patch(authController.protect,
        userController.updateMe)
route.route('/deleteMe')
    .delete(authController.protect,
        userController.deleteMe)
route.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

route.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = route