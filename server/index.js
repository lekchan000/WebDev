const express = require('express')
const bodyparser = require('body-parser')

const app = express()
const port = 8000

let users = []
let counter = 1

app.use(bodyparser.json())

app.get('/users',(req,res)=>{
  res.json(users)
})

app.post('/user',(req,res)=>{
  let user = req.body
  user.id = counter
  counter += 1

  users.push(user)
  res.json({
    message: 'add ok',
    user: user
  })
})

app.put('/user/:id',(req,res)=>{
  let id = req.params.id
  let updateuser = req.body
  // search user
  let selectedindex = users.findIndex(user => user.id == id)
  res.send(selectedindex + '')
  // update user
  users[selectedindex] = updateuser
  res.json({
    message:'Update Complete',
    data: {
      user: updateuser,
      indexupdate: selectedindex
    }
  })
})

app.listen(port, (req,res) => {
  console.log('HTTP server run at ' + port)
})