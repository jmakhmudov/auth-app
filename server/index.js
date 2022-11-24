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

app.post('/api/update', (req, res) => {
  const id = req.body.id
  const c = req.body.col
  const c2 = req.body.col2
  const v = req.body.val
  const v2 = req.body.val2
  console.log(id)
  const u = `update users set ${c}='${v}', ${c2}='${v2}' where id =${id}`

  db.query(u, (err, result) => {
    console.log(err)
  })
})

app.post('/api/delete', (req, res) => {
  const id = req.body.id
  const d = "DELETE FROM users WHERE id=?;"

  db.query(d, id, (err, result) => {
    console.log(err)
  })
})

app.post('/api/insert', (req, res) => {
  const u = req.body.userData
  const date = req.body.date
  const time = req.body.time
  const i = "INSERT INTO users (name, email, password,regDate, regTime, loginDate, loginTime, blocked) VALUES (?,?,?,?,?,?,?, 0);"

  db.query(i, [u.name, u.email, u.password, date, time, date, time], (err, result) => {
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