const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema(
    {
        review: {
            type: String,
            required: [true, 'Review can not be empty!']
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        createAt: {
            type: Date,
            default: Date()
        },
        tour: {
            type: mongoose.Schema.ObjectId,
            ref: 'Tour',
            require: [true, 'Review must belong to a tour.']
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            require: [true, 'Review must belong to a user.']
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'tour',
        select: 'name'
    })
    this.populate({
        path: 'user',
        select: 'name photo'
    })
    next()
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review