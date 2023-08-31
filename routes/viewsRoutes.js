const express = require('express')
const viewsController = require('./../controllers/viewsController')
const route = express.Router()

route.get('/', viewsController.getOverview)
route.get('/tour', viewsController.getTour)

module.exports = route