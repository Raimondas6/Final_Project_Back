const userSchema = require("../models/userSchema")
const photoSchema = require("../models/photoSchema")
const bcrypt = require("bcrypt")


module.exports = {
    registerUser: async (req, res) => {
        const {username, passOne: password, city, gender, age} = req.body

        const user = new userSchema()
            user.username = username,
            user.password = await bcrypt.hash(password, 10),
            user.city = city,
            user.gender = gender,
            user.age = age

        try {
            await user.save()
        } catch (e) {
            console.log('got error')
        }

        res.send({success: true, error: "User registered"})
    },
    login: async (req, res) => {
        const {username, password} = req.body

        const user = await userSchema.findOne({username})

        if (!user) return res.send({error: false, message: "User with this username does not exist"})

        if (user) {
            const passMatches = await bcrypt.compare(password, user.password)
            if (!passMatches) return res.send({error: false, message: "Wrong password"})
        }

        if (req.body.checkBox) {
            req.session.user = req.body.username
            res.send({success: true, message: "Stay Logged In"})
        } else {
            res.send({success: true, message: "Logged In"})
        }
    },
    //
    uploadPhoto: async (req, res) => {
        const {photo} = req.body


        if (req.session.username) {
            const user = new userSchema()
                user.photo = photo
                user.username = req.session.username

            user.photo.push(photo)

            try {
                await user.save()
            } catch (e) {
                console.log('got error')
            }

        }

        // console.log(req.session)
        // console.log(user)

        res.send({success: true, photo})
    },
    getPhoto: async (req, res) => {
        // const {photo} = req.body

        const user = await userSchema.find()
        // console.log(user)

        res.send({success: true, user})
    },
    getUsers: async (req, res) => {
        const users = await userSchema.find({_id:{$ne:req.body._id}}).select([
            "username",
            "city",
            "gender",
            "age",
            "photo"
        ])
        // console.log({user: req.session.user})
        console.log(users)
        res.send(users)
    },
    currentUser: async (req, res) => {
        const user = req.body
        try {
            const user = await userSchema.findOne({_id:{$ne:req.body._id}}).select([
                "username",
                "city",
                "gender",
                "age",
                "photo"
            ])

            if (!user) {
                return res.status(400).json({ message: "There is no profile for this user" })
            }
        console.log(user)
            res.json(user)
        } catch (err) {
            console.error(err.message);
            res.status(500).send({message: "Server error", user})
        }
        console.log(user)
        // if (req.session.user)
        //     return res.send({error: false, user: req.session.user})
        // else res.send({error: true})
        // console.log({user: req.session.user})
    }

}