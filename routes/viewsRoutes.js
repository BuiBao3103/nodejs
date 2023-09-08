const express = require('express')
const viewsController = require('./../controllers/viewsController')
const route = express.Router()
const authController = require('./../controllers/authController')

route.use(authController.isLoggedIn)

route.get('/', viewsController.getOverview)
route.get('/tour/:slug', viewsController.getTour)
route.get('/login', viewsController.getLoginForm)
module.exports = route