const express = require('express')
const bodyparser = require('body-parser')

const app = express()
const port = 8000

let users = []
let counter = 1

app.use(bodyparser.json())

//------------------------------------------------------------------
app.get('/users',(req,res)=>{
  const filterUser = users.map(user =>{
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname ,
      fullname: user.firstname +' '+ user.lastname
    }
  })
  res.json(filterUser)
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
//------------------------------------------------------------------
app.get('/users/:id',(req,res)=>{
  let id = req.params.id
  let selectedindex = users.findIndex(user => user.id == id)
  res.json(users[selectedindex])
})
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
app.put('/user/:id',(req,res)=>{
  let id = req.params.id
  let updateuser = req.body
  // search user
  let selectedindex = users.findIndex(user => user.id == id)
  // update user
  users[selectedindex].firstname  = updateuser.firstname    || users[selectedindex].firstname
  users[selectedindex].lastname   = updateuser.lastname     || users[selectedindex].lastname
  users[selectedindex].age        = updateuser.age          || users[selectedindex].age
  users[selectedindex].gender     = updateuser.gender       || users[selectedindex].gender
})
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
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

app.listen(port, (req,res) => {
  console.log('HTTP server run at ' + port)
})
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------
//------------------------------------------------------------------