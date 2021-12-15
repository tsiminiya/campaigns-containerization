## Environment Variables

To introduce the use of Environment Variables in Docker Containers, let's open and examine the source code under *crypto-prices*

```javascript
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
  console.log(`App is listening at port ${port}`)
})
```

Also, examine the contents of the Dockerfile

```Dockerfile
FROM campaigns-node:v16

RUN mkdir -p /usr/src

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

CMD [ "npm", "start" ]
```

On the next Hands-on Exercise, we are going to play around the values of the Environment variables APP_PORT and API_CONNECTION_MODE

![Hands-on Exercise](../common/hands-on.png)

1. First change directory to *crypto-prices* and build the Docker Image

```bash
cd ../crypto-prices
docker build -t crypto-prices .
```

2. Run the Docker Image without supplying any environment variables

```bash
docker run -it --publish 8123:8123 crypto-prices:latest
```

Take note of the logged port and API connection mode. Also, try to access the API via curl or postman

```bash
curl http://localhost:8123/ETHBTC
```

3. Press Control+C at the terminal where the container executes and run the Docker Image with environment variables

```bash
docker run -it --env APP_PORT=8910 --env API_CONNECTION_MODE=1 -p 8123:8910 crypto-prices:latest
```

Try to access the API via curl or postman

```bash
curl http://localhost:8123/ETHBTC
```

![Hands-on Exercise End](../common/hands-on_end.png)

[Back to Top](../README.md) | [Previous](../05/mounting_volumes.md) | [Next](../07/other_useful_docker_commands.md)
