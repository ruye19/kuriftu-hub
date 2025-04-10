const mysql2 = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()

const dbcon = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
 
})

module.exports = dbcon.promise()
