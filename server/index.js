const express = require("express")
const cors = require("cors")
const app = express()
const mySql = require("mysql")
const PORT = 5000

app.use(cors())
app.use(express.json())

const db = mySql.createPool({
  host: "containers-us-west-115.railway.app",
  user: "root",
  password: "9t4stuzuBjGVCFGg7wsf",
  database: "railway",
  port: "6166"
})

app.get('/', (req, res) => {
  db.query("select * from users", (err, result) => {
    console.log(result)
    console.log(err)
    res.send(result)
  })
})

app.listen(PORT, () => {
  console.log("runing on port " + PORT)
})