const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,

    },
    username: {

        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,

    },
    phone: {
        type: String,
        trim: true
    },
    profilePhoto: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    confirm: {
        type: String,
        trim: true
    },
    activationToken: String,
    activated: {
        type: Boolean,
        default: false
    }
})

tasksSchema.statics.getName = function (name) {
    return this.find({
        name
    });
};

const User = mongoose.model('User', tasksSchema)

module.exports = User