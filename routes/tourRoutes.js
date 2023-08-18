const express = require('express')
const tourController = require('./../controllers/tourController')
const authController = require('./../controllers/authController')
const route = express.Router()

// route.param('id', tourController.checkID)

route.route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours)
route.route('/tour-stats')
    .get(tourController.getTourStats)

route.route('/monthly-plan/:year')
    .get(tourController.getMonthlyPlan)
route.route('/')
    .get(authController.protect,
        tourController.getAllTours)
    .post(tourController.createTour)
route.route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.deleteTour)

module.exports = route