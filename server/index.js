const express = require("express")
const cors = require("cors")
const app = express()
const mySql = require("mysql")
const PORT = 5000

app.use(cors())
app.use(express.json())

const db = mySql.createPool("CREATE USER 'root'@'containers-us-west-115.railway.app' IDENTIFIED WITH mysql_native_password BY '9t4stuzuBjGVCFGg7wsf';")

app.get('/api/insert', (req, res) => {
  db.query("select * from users", (err, result) => {
    console.log(err)
    res.send("insert")
  })
})

app.listen(PORT, () => {
  console.log("runing on port " + PORT)
})