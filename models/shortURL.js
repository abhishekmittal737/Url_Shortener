const mongoose = require('mongoose');
const shortID = require('shortid');

const shortURLSchema = new mongoose.Schema({
    full:{
        type: String,
    },
    short:{
        type: String,
        default: shortID.generate
    }
})

module.exports = mongoose.model('shortURL',shortURLSchema)