const Tour = require('./../models/tourModel')
const catchAsync = require('./../utils/catchAsync')
const slug = require('slugify')
const AppError = require('./../utils/appError')
exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find()
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  })
})
exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({
    slug: req.params.slug
  }).populate({
    path: 'reviews',
    field: 'review rating user'
  })

  if (!tour)
    return next(new AppError('There is no tour with that name.', 404))

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

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'your account'
  })
}