const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const db = mysql.createPool({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'bcd2aa85e0d257',
  password: 'd18fe272',
  database: 'heroku_314cba1ab45c526',
})

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'yipproject',
// })

// db.connect((err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('mysql connected ...')
//   }
// })

// HANDLE DISCONNECTION

// function handleDisconnect() {
//   db.connect(function (err) {
//     // The server is either down // or restarting (takes a while sometimes).
//     if (err) {
//       // console.log('error when connecting to db:', err)
//       // setTimeout(handleDisconnect, 2000) // We introduce a delay before attempting to reconnect,to avoid a hot loop, and to allow our node script to
//     } else {
//       console.log('mysql connected ...')
//     }
//   }) // process asynchronous requests in the meantime. If you're also serving http, display a 503 error.

//   db.on('error', function (err) {
//     console.log('db error', err)
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       // Connection to the MySQL server is usually
//       handleDisconnect() // lost due to either server restart, or a
//     } else {
//       // connnection idle timeout (the wait_timeout
//       throw err // server variable configures this)
//     }
//   })
// }

// handleDisconnect()

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
