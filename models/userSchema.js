const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    photo:
        {
            type: Array,
            required: true,
            default:  [
                {
                    type: String,
                    default: "https://cdn.vox-cdn.com/thumbor/NJ402l3diTT3bZvs2-zLZJ5Ah84=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/10838133/feelsgoodman.jpg"
                }]
        }
    // checkBox: {
    //     type: Boolean,
    //     required: false
    // }
})

module.exports = mongoose.model('registeredUser', userSchema)