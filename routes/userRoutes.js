const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const route = express.Router()

route.route('/signup').post(authController.signup)
route.route('/login').post(authController.login)
route.route('/forgotPassword').post(authController.forgotPassword)
route.route('/resetPassword/:token').patch(authController.resetPassword)

//protect all routes after this middleware
route.use(authController.protect)

route.route('/me')
    .get(userController.getMe,
        userController.getUser)
route.route('/updateMyPassword').patch(authController.updatePassword)
route.route('/updateMe').patch(userController.updateMe)
route.route('/deleteMe').delete(userController.deleteMe)

route.use(authController.restrictTo('admin'))

route.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

route.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = route