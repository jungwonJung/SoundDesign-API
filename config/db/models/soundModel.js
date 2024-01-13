const mongoose = require('mongoose');


const soundSchema = new mongoose.Schema({
    accountId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"                           
    },
    fileName: {
        type: String
    },
    filePath: {
        type: String
    },
    soundName: {
        type: String,
        index: true
    },
    category: {
        type: String,
        index: true
    },
    tags: {
        type: Array,
        index: true                                     
    },
    created: {
        type: Number
    },
    isLiked: {
        type: Boolean,
    },
})

mongoose.model("Sound", soundSchema);
module.exports = mongoose.model("Sound");
