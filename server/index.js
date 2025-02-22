const express = require('express')
const app = express()
const port = 8000

app.listen(port, (req,res) => {
  console.log('HTTP server run at ' + port)
})