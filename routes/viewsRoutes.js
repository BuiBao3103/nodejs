const express = require('express')
const viewsController = require('./../controllers/viewsController')
const route = express.Router()
const authController = require('./../controllers/authController')


route.get('/', authController.isLoggedIn, viewsController.getOverview)
route.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour)
route.get('/login', authController.isLoggedIn, viewsController.getLoginForm)
route.get('/register', authController.isLoggedIn, viewsController.getRegisterForm)
route.get('/me', authController.protect, viewsController.getAccount)
module.exports = route