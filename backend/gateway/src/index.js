const express = require('express')
const axios = require('axios')
const cors = require('cors')
const { printThroughPut } = require('./metrics')

const app = express()

const portMap = {
  meeting: 3001,
  poll: 3002,
  notification: 3003,
  reserve: 3004,
  analytics: 3005,
  user: 3006,
  comment: 3007
}

app.use(express.json())
app.use(cors())

app.get('/:service/*', (req, res) => {
  printThroughPut()

  const service = req.params.service
  const port = portMap[service]
  if (!port || !service) res.sendStatus(404)

  const url = req.url.substring(service.length + 1)

  axios
    .get(`http://localhost:${port}${url}`)
    .then(response => res.status(response.status).send(response.data))
    .catch(error => res.sendStatus(error.response.status))
})

app.post('/:service/*', (req, res) => {
  printThroughPut()

  const service = req.params.service
  const port = portMap[service]
  if (!port || !service) res.sendStatus(404)

  const url = req.url.substring(service.length + 1)
  axios
    .post(`http://localhost:${port}${url}`, req.body)
    .then(response => res.status(response.status).send(response.data))
    .catch(error => res.sendStatus(error.response.status))
})

app.listen(3000, () => console.log(`Gateway listening on port ${3000}!`))
