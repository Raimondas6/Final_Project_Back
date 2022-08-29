const express = require("express")
const router = express.Router()
const {registerUser,
    login,
    uploadPhoto,
    getPhoto,
    getUsers,
    currentUser,
} = require("../controllers/mainController")
const {validateRegister} = require("../middleware/validators")

router.post('/register', validateRegister, registerUser)
router.post('/login', login)
router.post("/uploadPhoto", uploadPhoto)
router.get("/getPhoto", getPhoto)
router.get("/currentUser", currentUser)
router.get("/getUser", getUsers)


module.exports = router