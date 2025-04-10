//require("dotenv").config();
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const usersRoutes = require("./routes/userRoutes")
const authMiddleWare = require(".authMiddleware.js");
PORT = 5500
// const PORT = process.env.PORT || 5500
const dbcon = require("./db/dbConfig")
//login route

app.use(express.json())

app.get("/", (req, res) => {
  res.send("done!")
})

app.use("/api/users", usersRoutes)



async function start() {
  try {
    console.log("start database connection")
    const result = await dbcon.execute("select 'test'")
    console.log(result)
    console.log("end database connection")
  } catch (error) {
    console.log(error.message)
  }
}

start()

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log("server is up ")
  }
})


