const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: true,
        lowercase: true,
        validator: [validator.isEmail, 'please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8
    }
    ,
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password!'],
        minlength: 8,
        validate: {
            //this only work on CREATE or SAVE!!
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not the same!'
        }
    }
})

const User = mongoose.model('User', userSchema)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

module.exports = User