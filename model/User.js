const mongoose =require('mongoose');

const UserSchema = mongoose.Schema({
    fbId:{
        type: String,
        required: true
    },
    displayName:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    photo:{
        type: String,
    }
})

module.exports = mongoose.model('User', UserSchema)