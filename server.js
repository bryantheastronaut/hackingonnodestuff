const express = require('express')
const cheerio = require('cheerio')

const app = express()
const PORT = process.env.PORT || 8888

app.get('/', (req, res) => {
  res.send('potato')
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
