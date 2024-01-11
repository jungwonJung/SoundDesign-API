const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    accountId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"                           
    },
    soundId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Sound"                          
    },
    created: {
        type: Number
    },
    updated: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
    },
})



module.exports = mongoose.model('Like', likeSchema)