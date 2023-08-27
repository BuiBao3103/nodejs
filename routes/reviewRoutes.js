const express = require('express')
const reviewController = require('./../controllers/reviewController')
const authController = require('./../controllers/authController')
const route = express.Router({ mergeParams: true })

route.use(authController.protect)

route.route('/')
    .get(reviewController.getAllReviews)
    .post(authController.restrictTo('user'),
        reviewController.setTourUserIds,
        reviewController.createReview)

route.route('/:id')
    .get(reviewController.getReview)
    .patch(authController.restrictTo('admin', 'user'),
        reviewController.updateReview)
    .delete(authController.restrictTo('admin', 'user'),
        reviewController.deleteReview)

module.exports = route