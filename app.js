const express = require('express')
const Sha1 = require('sha1')
const config = require('./util/config')
const app = express()
const port = 80

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/wx', (req, res) => {
  let signature = req.query.signature
  let timestamp = req.query.timestamp
  let nonce = req.query.nonce
  let echostr = req.query.echostr
  let token = config.token

  let str = [token, timestamp, nonce].sort().join('')
  let tempStr = Sha1(str)
  if (tempStr === signature) {
    res.send(echostr)
  } else {
    res.send('wrong')
  }
  res.send('wx')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))