const mongoose = require("mongoose")
const Schema = mongoose.Schema

const photoSchema = new Schema({
    photo: {
        type: String,
        required: true
    },
    // username: {
    //     type: String,
    //     required: true
    // }
})

module.exports = mongoose.model('myPhotos', photoSchema)