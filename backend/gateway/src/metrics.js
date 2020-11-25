const axios = require('axios')

const startTime = new Date()
let reqCount = 0

exports.printThroughPut = () => {
  reqCount += 1
  const seconds = Math.floor((new Date() - startTime) / 1000)
  console.log(
    'seconds: ',
    seconds,
    ' reqCount: ',
    reqCount,
    ' through-put: ',
    (reqCount / seconds).toFixed(2)
  )

  axios.post('http://localhost:3005/api/insertEvent', {
    type: 'GATEWAY_THROUGHPUT',
    data: { throughput: reqCount / seconds },
    time: new Date()
  })
}
