const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')

const app = express()
const port = 8000
let conn = null

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
app.post('/users', async (req,res)=>{
  try {
    let user = req.body
    const results = await conn.query('INSERT INTO users SET ?',user)
    res.json({
      message:'INSERT COMPLETED',
      data: results[0]
    })
  } catch (error) {
    console.log('errorMessage',error.message)
    res.status(500).json({
      message:'Something Wrong',
    })
  }
})
//------------------------------------------------------------------
app.get('/users/:id', async (req,res)=>{
  try {
    let id = req.params.id
    const results = await conn.query('SELECT * FROM users WHERE id = ?',id)

    if (results[0].length == 0){
      throw { statusCode: 404,message:'Not Found'}
    }
    res.json(results[0][0])
  } catch (error) {
    console.log('errorMessage : ',error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
    message:'Something Wrong',
    errorMessage: error.message
    })
  }
})
//------------------------------------------------------------------
app.put('/users/:id', async (req, res, next) => {
    try {
      let id = parseInt(req.params.id)
      let updateUser = req.body
      const results = await conn.query('UPDATE users SET ? WHERE id = ? ',[updateUser,id])

      res.json({
        message:'UPDATE COMPLETED',
        data: results[0]
      })
    } catch (error) {
      console.log('errorMessage',error.message)
      res.status(500).json({
        message:'Something Wrong',
      })
    }
})
//------------------------------------------------------------------
app.delete('/users/:id', async (req,res) =>{
  try {
    let id = parseInt(req.params.id)
    const results = await conn.query('DELETE from users WHERE id = ? ',id)

    res.json({
      message:'DELETE COMPLETED',
      data: results[0]
    })
  } catch (error) {
    console.log('errorMessage',error.message)
    res.status(500).json({
      message:'Something Wrong',
    })
  }
})
//------------------------------------------------------------------
app.listen(port, async (req,res) => {
  await initMysql()
  console.log('HTTP server run at ' + port)
})
