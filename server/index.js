const express = require('express')
const app = express()
const port = 3000
const db = require('../database/mysql.js') // USE FOR MYSQL
// const db = require('../database/mongo.js') // USE FOR MONGO

app.use(express.static('client/dist'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/read', async (req, res) => {
  try {
    let entries = await db.readAll()
    res.status(200).send(entries)
  } catch(e) {
    console.log('server GET error:', e)
    res.status(404).send('GET request error!')
  }
})

app.listen(port, () => {
  console.log(`Listening at port ${port}.`)
})