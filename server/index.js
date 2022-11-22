const express = require("express")
const bodyParser = require("body-parser")
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

app.post('/api/insert', (req, res) => {
  const u = req.body.userData
  const i = "INSERT INTO users (name, email, password,regDate, lastDate) VALUES (?,?,?,'20.11.2022','20.11.2022');"

  db.query(i, [u.name, u.email, u.password], (err, result) => {
    console.log(err)
  })
})

app.get('/api/get', (req, res) => {
  db.query("select * from users", (err, result) => {
    console.log(result)
    console.log(err)
    res.send(result)
  })
})

app.listen(PORT, () => {
  console.log("runing on port " + PORT)
})