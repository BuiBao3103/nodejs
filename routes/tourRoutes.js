const express = require('express')
const tourController = require('./../controllers/tourController')
const authController = require('./../controllers/authController')
const reviewRoute = require('./reviewRoutes')
const route = express.Router()

// route.param('id', tourController.checkID)

route.use('/:tourId/reviews', reviewRoute)


route.route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours)
route.route('/tour-stats')
    .get(tourController.getTourStats)

route.route('/monthly-plan/:year')
    .get(authController.protect,
        authController.restrictTo('admin', 'lead-guide', 'guide'),
        tourController.getMonthlyPlan)

route.route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(tourController.getToursWithin)

route.route('/distances/:latlng/unit/:unit')
    .get(tourController.getDistances)
    
route.route('/')
    .get(tourController.getAllTours)
    .post(authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.createTour)
route.route('/:id')
    .get(tourController.getTour)
    .patch(authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.updateTour)
    .delete(authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.deleteTour)

module.exports = route