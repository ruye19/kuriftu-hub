const express = require("express")
const router = express.Router()

// usercontroller
const authMiddleWare = require("../middleware/authMiddleware")

const { register, login, checkUser,getFullName } = require("../controller/userController")

router.post("/register", register)
router.post("/login", login)
router.get("/check", authMiddleWare,checkUser)
router.get("/getFullName", authMiddleWare, getFullName)

module.exports = router