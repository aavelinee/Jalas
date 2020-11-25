// modules
const R = require('ramda')
const express = require('express')
const axios = require('axios')
const P = require('bluebird')
const retry = require('bluebird-retry')

const app = express()

let cancelingRooms = {}

app.use(express.json())

const RESERVE_SYSTEM_ADDR = 'reserve.utse.ir'

app.get('/api/getAvailableRooms/:start/:end', (req, res) => {
  const { start, end } = req.params
  const reqUrl = `http://${RESERVE_SYSTEM_ADDR}/available_rooms?start=${start}&end=${end}`

  const requestWithRetry = () =>
    new P((resolve, reject) =>
      axios
        .get(reqUrl)
        .then(resolve)
        .catch(err =>
          err.response.status === 400 ? resolve({ status: 400 }) : reject(err)
        )
    ).timeout(5000)

  retry(requestWithRetry, { max_tries: 10 })
    .then(response => res.status(response.status).send(response.data))
    .catch(error =>
      error.failure
        ? res.sendStatus(error.failure.response.status)
        : res.sendStatus(500)
    )
})

app.post('/api/reserveRoom', (req, res) => {
  const { roomNumber, start, end, userId } = req.body
  const reqUrl = `http://${RESERVE_SYSTEM_ADDR}/rooms/${roomNumber}/reserve`

  const requestWithRetry = () => {
    if (cancelingRooms[roomNumber]) {
      cancelingRooms = R.dissoc(roomNumber, cancelingRooms)
      throw new retry.StopError()
    }

    return new P((resolve, reject) =>
      axios
        .post(reqUrl, {
          username: userId,
          start,
          end
        })
        .then(resolve)
        .catch(err =>
          err.response.status === 400 ? resolve({ status: 400 }) : reject(err)
        )
    ).timeout(5000)
  }

  retry(requestWithRetry, { max_tries: 10 })
    .then(response => res.status(response.status).send(response.data))
    .catch(error =>
      error.failure
        ? res.sendStatus(error.failure.response.status)
        : res.send('cancelled')
    )
    .finally(() => {
      cancelingRooms = R.dissoc(roomNumber, cancelingRooms)
    })
})

app.post('/api/cancelReserve', (req, res) => {
  const { roomNumber } = req.body

  cancelingRooms = R.assoc(roomNumber, true, cancelingRooms)
  res.sendStatus(200)
})

app.listen(3004, () => console.log(`Reserve listening on port ${3004}!`))
