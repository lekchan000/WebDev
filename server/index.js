const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')

const app = express()
const port = 8000
let conn = null

let users = []
let counter = 1

app.use(bodyparser.json())

const initMysql = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database:'tutorial',
    port:'3306'
  })
}
//------------------------------------------------------------------
app.get('/users', async (req,res)=>{
    const results = await conn.query('SELECT * FROM users') 
    res.json(results[0])
  })
//------------------------------------------------------------------
app.post('/users',(req,res)=>{
  let user = req.body
  user.id = counter
  counter += 1

  users.push(user)
  res.json({
    message: 'add ok',
    user: user
  })
})
//------------------------------------------------------------------
app.get('/users/:id',(req,res)=>{
  let id = req.params.id
  let selectedindex = users.findIndex(user => user.id == id)
  res.json(users[selectedindex])
})
//------------------------------------------------------------------
app.put('/users/:id', (req, res, next) => {
  try {
    let id = parseInt(req.params.id)
    let updateUser = req.body
    let selectedIndex = users.findIndex(user => user.id === id)
    if (selectedIndex !== -1) {
      users[selectedIndex] = {
        ...users[selectedIndex],
        ...updateUser
      }
      res.json({
        message: 'Updated',
        data: {
          user: users[selectedIndex],
          indexUpdate: selectedIndex
        }
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    next(err)
  }
})
//------------------------------------------------------------------
app.delete('/users/:id',(req,res) =>{
  let id = req.params.id
    // search user index
  let selectedindex = users.findIndex(user => user.id == id)
    // delete it

  users.splice(selectedindex,1)

  res.json({
    message: 'Deleted',
    indexDelete: selectedindex
  })
})
//------------------------------------------------------------------
app.listen(port, async (req,res) => {
  await initMysql()
  console.log('HTTP server run at ' + port)
})
