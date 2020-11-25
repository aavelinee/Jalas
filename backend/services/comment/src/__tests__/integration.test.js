const { getAllMeetingsHandler } = require('../routeHandlers')
const { Meeting } = require('../model')
const { connect } = require('../db')

const meetings = [
  {
    __v: 0,
    _id: '5cc441d812407c1844353f69',
    title: 'meeting1',
    room: 801,
    participants: ['mail.mmdghanbari@gmail.com'],
    userId: '5aa441d842401c1844353fdd',
    startDate: new Date(),
    endDate: new Date()
  },
  {
    __v: 0,
    _id: '1cd441d813407c1844353f67',
    title: 'meeting2',
    room: 610,
    participants: ['eileen.jamali@gmail.com', 'fatemeh.haghighi550@gmail.com'],
    userId: '2ab441d842401g1844353fdd',
    startDate: new Date(),
    endDate: new Date()
  }
]

const leanId = items =>
  items.map(({ _id, ...other }) => ({
    _id: _id.toString(),
    ...other
  }))

let dbConnection

beforeAll(() =>
  connect('jalas').then(conn => {
    dbConnection = conn
    return conn
  })
)

afterAll(() => dbConnection.disconnect())

beforeEach(async () => {
  await Meeting.deleteMany({})
  await Meeting.insertMany(meetings)
})

describe('should return proper data', () => {
  test('getAllMeetings from db', () =>
    new Promise(resolve =>
      getAllMeetingsHandler(
        {},
        {
          send: value => {
            expect(leanId(value)).toEqual(meetings)
            resolve()
          }
        }
      )
    ))
})
