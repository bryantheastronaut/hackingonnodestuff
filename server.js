const express = require('express')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')

const app = express()
const PORT = process.env.PORT || 8888

app.get('/scrape', (req, res) => {
  let url = 'http://www.imdb.com/title/tt1229340/'
  let title, release, rating
  let json = { title : '', release : '', rating : '' }

  request(url, function(error, response, html) {
    if (!error) {
      let $ = cheerio.load(html)
      $('.title-wrapper').filter(function() {
        let data = $(this)
        title = data.children().first().text().trim()
        release = data.children().last().children().last().text().trim()

        json.title = title
        json.release = release
      })

      $('.rating').filter(function() {
        let data = $(this)
        rating = data.text().trim()

        json.rating = rating
      })
    }
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
      console.log('file written successfully -- check console.')
    })
    res.send('check console.')
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
