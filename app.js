const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const db = mysql.createConnection({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'bcd2aa85e0d257',
  password: 'd18fe272',
  database: 'heroku_314cba1ab45c526',
})

db.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('mysql connected ...')
  }
})

app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE yipProject'
  db.query(sql, (err, result) => {
    if (err) {
      console.log('err')
    } else {
      res.send('database created')
    }
  })
})

app.get('/', (req, res) => {
  let plannerSql = 'SELECT * from planner'
  let customerSql = 'SELECT * from customer'

  db.query(customerSql, (err1, result1) => {
    if (err1) {
      throw err1
    } else {
      db.query(plannerSql, (err2, result2) => {
        if (err2) {
          throw err2
        } else {
          res.render('index', { result: result2, customer: result1 })
        }
      })
    }
  })
})

app.get('/read', (req, res) => {
  let sql = 'SELECT * from planner'
  db.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      console.log('seen all data')
      res.send(result)
    }
  })
})

app.get('/createCustomerTable', (req, res) => {
  let sql =
    'CREATE TABLE customer(id int AUTO_INCREMENT, customerName VARCHAR(255), pickUpLocation VARCHAR(255), dropOffLocation VARCHAR(255), PRIMARY KEY(id) )'

  db.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      res.send('Customer Table created ...')
    }
  })
})

app.get('/newCustomer', (req, res) => {
  let sql = 'INSERT INTO customer SET ?'
  let data = {
    customerName: 'Abubakar',
    pickUpLocation: 'Yobe',
    dropOffLocation: 'Ibadan',
  }
  db.query(sql, data, (err, result) => {
    if (err) {
      throw err
    } else {
      res.redirect('/')
      console.log('new customer added')
    }
  })
})

app.get('/createPlannerTable', (req, res) => {
  let sql =
    'CREATE TABLE planner(id int AUTO_INCREMENT, date DATE, slot1 VARCHAR(255), slot2 VARCHAR(255), slot3 VARCHAR(255), slot4 VARCHAR(255), PRIMARY KEY(id) )'

  db.query(sql, (err, result) => {
    if (err) {
      throw err
    } else {
      res.send('Planner Table created ...')
    }
  })
})

const today = new Date()
const currentDate = new Date('2022, 02, 04')
// console.log(currentDate.toLocaleDateString())

const options = {
  weekday: 'long',
}
const day1 = new Date(today)
day1.setDate(day1.getDate() + 0)
const day2 = new Date(today)
day2.setDate(day2.getDate() + 1)
const day3 = new Date(today)
day3.setDate(day3.getDate() + 2)
const day4 = new Date(today)
day4.setDate(day4.getDate() + 3)
const day5 = new Date(today)
day5.setDate(day5.getDate() + 4)
const day6 = new Date(today)
day6.setDate(day6.getDate() + 5)
const day7 = new Date(today)
day7.setDate(day7.getDate() + 6)

// console.log(today.toLocaleDateString('en-us', { weekday: 'long' }))
// console.log(today.toLocaleDateString())
let mydate = { date: '2022-02-12' }

let sql = 'INSERT INTO planner SET ?'
db.query(sql, mydate, (err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log('ok')
  }
})

app.post('/slot1', (req, res) => {
  const key = Number(req.body.planner.slice(0, 1))
  const name = req.body.planner.slice(1)

  //   newDay = new Date(today)
  //   switch (key) {
  //     case 1:
  //       newDay.setDate(newDay.getDate() + 0)
  //       break
  //     case 2:
  //       newDay.setDate(newDay.getDate() + 4)
  //       break
  //     case 3:
  //       newDay.setDate(newDay.getDate() + 2)
  //       break
  //     case 4:
  //       newDay.setDate(newDay.getDate() + 3)
  //       break
  //     case 5:
  //       newDay.setDate(newDay.getDate() + 4)
  //       break
  //     case 6:
  //       newDay.setDate(newDay.getDate() + 5)
  //       break
  //     case 7:
  //       newDay.setDate(newDay.getDate() + 6)
  //       break
  //     default:
  //       console.log('no')
  //       break
  //   }

  let sql = `UPDATE planner SET slot1 = "${name}" WHERE id = "${key}"`
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('data added in slot 1')
    }
  })

  res.redirect('/')
})

app.post('/slot2', (req, res) => {
  const key = Number(req.body.planner.slice(0, 1))
  const name = req.body.planner.slice(1)
  let sql = `UPDATE planner SET slot2 = "${name}" WHERE id = "${key}"`
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('data added in slot 2')
    }
  })

  res.redirect('/')
})

app.post('/slot3', (req, res) => {
  const key = Number(req.body.planner.slice(0, 1))
  const name = req.body.planner.slice(1)
  let sql = `UPDATE planner SET slot3 = "${name}" WHERE id = "${key}"`
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('data added in slot 3')
    }
  })

  res.redirect('/')
})

app.post('/slot4', (req, res) => {
  const key = Number(req.body.planner.slice(0, 1))
  const name = req.body.planner.slice(1)
  let sql = `UPDATE planner SET slot4 = "${name}" WHERE id = "${key}"`
  let query = db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('data added in slot 4')
    }
  })

  res.redirect('/')
})

let port = process.env.PORT
if (port == null || port == '') {
  port = 6565
}

app.listen(port, function () {
  console.log('App running at port ' + port)
})
