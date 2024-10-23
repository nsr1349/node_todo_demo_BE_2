const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY


const userSchema = Schema({
        name : {
            type : String,
            require : true
        },
        email : {
            type : String,
            require : true
        },
        password : {
            type : String,
            require : true
        },
    },
    { timestamps : true }
)

userSchema.methods.toJSON = function () {
    const { _doc } = this
    delete _doc.password
    delete _doc.updatedAt
    delete _doc.__v
    return _doc
}

userSchema.methods.generateToken = function (){
    return jwt.sign({ _id : this._id}, JWT_SECRET_KEY)
}

const User = mongoose.model('User', userSchema)

module.exports = User