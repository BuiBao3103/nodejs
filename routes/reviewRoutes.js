const express = require('express')
const reviewController = require('./../controllers/reviewController')
const authController = require('./../controllers/authController')
const route = express.Router({ mergeParams: true })

route.route('/')
    .get(reviewController.getAllReviews)
    .post(authController.protect,
        authController.restrictTo('user'),
        reviewController.createReview)

route.route('/:id')
    .delete(authController.protect,
        authController.restrictTo('admin'),
        reviewController.deleteReview)

module.exports = route