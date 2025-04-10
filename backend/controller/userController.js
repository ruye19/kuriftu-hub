const dbcon = require("../db/dbConfig")
const bcrypt = require("bcrypt")

const { StatusCodes } = require("http-status-codes")
const jwt = require("jsonwebtoken")


// register
const register = async (req, res) => {
  const {  email, password, username,full_name } = req.body
  if (!username || !email || !password  || !full_name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "All input is required" })
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 8 characters" })
  }
  try {
    const [user] = await dbcon.query(
      "SELECT username,userid FROM users WHERE email = ? or username = ?",
      [email, username]
    )
    if (user.length > 0) {
      return res.status(400).json({ msg: "User already exists" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    await dbcon.query(
      "INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)", // ✅ Correct
      [username, email, hashedPassword, full_name] // ✅ Now match
    );
    return res.status(201).json({ msg: "User created" })
  } catch (error) {
    console.log("register error:" , error)
    return res.status(500).json({ msg: "Internal server error",error: message })
  }
}
// login 
const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(401).json({ msg: "Please enter all the fields" })
  }

  try {
    const [user] = await dbcon.query(
      "SELECT username, userid, password FROM users WHERE email = ?",
      [email]
    )
  
    if (user.length == 0) {
      return res.status(401).json({ msg: "Invaluserid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user[0].password)
    if (!isMatch) {
      return res.status(401).json({ msg: "Unauthorized" })
    }

    const username = user[0].username
    const userid = user[0].userid
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    })

    return res
      .status(200)
      .json({ msg: "User login successful", token, username, userid })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ msg: "Server faced an error" })
  }
}
// async function checkUser(req, res) {
//   console.log("in check")
//   const fulname = req.user.username
//   const userid = req.user.userid
//   console.log(usernamename, userid)
//   res.status(StatusCodes.OK).json({ msg: "valuserid user", username, userid })
  // res.send("hello this is check user")
// }
// async function getusername(req, res) {
//   console.log("am in full name")
//   const [userusername] = await dbcon.query(
//     "SELECT *  FROM users WHERE userid = ?",
//     1
//   )
//   console.log(req.body.userid)
//     username = userusername[0].username
//     console.log(
//       "user full name",
//       userusername[0].firstname + " " + userusername[0].lastname
//     )
//     res.status(StatusCodes.OK).json({ msg: "valuserid user", username })
//   res.send("hello this is check user")
// }

module.exports = { login, register}
