const express = require("express")
const router = express.Router()

// usercontroller
const authMiddleWare = require("../middleware/authMiddleware")

const { register, login } = require("../controller/userController")

router.post("/signup", register)
router.post("/login", login)
// router.get("/check", authMiddleWare,checkUser)


module.exports = router