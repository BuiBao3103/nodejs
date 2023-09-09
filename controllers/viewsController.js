const Tour = require('./../models/tourModel')
const catchAsync = require('./../utils/catchAsync')
const slug = require('slugify')
exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find()
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  })
})
exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({
    slug: req.params.slug
  }).populate({
    path: 'reviews',
    field: 'review rating user'
  })
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour
  })
})

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'log into your account'
  })
}

exports.getRegisterForm = (req, res) => {
  res.status(200).render('register', {
    title: 'register'
  })
}