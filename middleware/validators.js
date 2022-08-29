const userSchema = require("../models/userSchema")


module.exports = {
    validateRegister: async (req, res, next) => {
        // const user = req.body
        const {username, passOne, passTwo, city, gender, age} = req.body
        const userExist = await userSchema.findOne({username: username})

        if (username.length <= 4) return res.send({error: true, message: "username is too short, at least 5 letters"})
        if (passOne !== passTwo) return res.send({error: true, message: "passwords do not match"})
        if (userExist) return res.send({error: true, message: "username already exist"})
        if (!username || !passOne || !passTwo || !city || !gender || !age) return res.send ({error: true, message: "all fields should be filled"})
        // if (gender !== "male" || "female") return res.send({error: true, message: "gender have to be male or female"})


        next()
    },

}