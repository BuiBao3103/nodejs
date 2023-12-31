const path = require('path')
const express = require('express')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRoute = require('./routes/reviewRoutes')
const viewsRoute = require('./routes/viewsRoutes')
const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//GLOBAL MIDDLEWARE
//Serving static files
app.use(express.static(path.join(__dirname, 'public')))
//Set security HTTP headers
app.use(helmet({
    contentSecurityPolicy: false
    // {
    //     directives: {
    //         "script-src": ["'self'", 'https://fonts.googleapis.com'],
    //         "style-src": null,
    //     },
    // },
}))
//Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request from this IP, please try again in an hour!'
})
app.use('/api', limiter)
//Body parser, reading data from body into req body
app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())
//Data sanitization against NoSQL query injection
app.use(mongoSanitize())
//Data sanitization against XSS
app.use(xss())
//Prevent parameter pollution
app.use(hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price']
}))

app.use((req, res, next) => {
    // console.log(req.cookies)
    next()
})
//ROUTES
app.use('/', viewsRoute)
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/reviews', reviewRoute)
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)
module.exports = app
