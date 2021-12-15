const request = require('request')
const express = require('express')
const app = express()

const links = [
  'https://api1.binance.com/api/v3/ticker/price',
  'https://api2.binance.com/api/v3/ticker/price',
  'https://api3.binance.com/api/v3/ticker/price'
]

const select = (mode) => {
  switch(mode) {
    case '1':
    case 'first':
      return links[0]
    case '2':
    case 'second':
      return links[1]
    case '3':
    case 'third':
      return links[2]      
    default:
      return links[Math.floor(Math.random() * 10) % 3]
  }
}

const apiConnectionMode = process.env.API_CONNECTION_MODE || 'random'
const port = process.env.APP_PORT || 8123

app.get('/:symbol', function(req, res) {
  const symbol = req.params.symbol
  const link = select(apiConnectionMode)
  request(
    link, // selected link
    { json: true },
    function(__, __, body) {
      const found = body.filter((c) => c.symbol === symbol)
      if (found.length > 0) {
        res.json({
          ...found[0],
          link
        })
      } else {
        res.status(404).json({
          message: `Symbol ${symbol} not found`,
          link
        })
      }
    }
  )
})

app.listen(port, () => {
  console.log(`API Connection Mode used is ${apiConnectionMode}`)
  console.log(`App is listening at port ${port}`)
})
