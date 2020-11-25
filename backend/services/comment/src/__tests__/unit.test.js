const { getAllMeetingsHandler } = require('../routeHandlers')
const dbFunctions = require('../db')

jest.mock('../db')

const meetings = ['meeting1', 'meeting2']

afterEach(jest.restoreAllMocks)

describe('getAllMeetings route handler', () => {
  test('should be a function', () => {
    expect(getAllMeetingsHandler).toBeInstanceOf(Function)
  })

  test('should call getAllMeetings once', () => {
    const mockedGetAllMeetings = jest
      .spyOn(dbFunctions, 'getAllMeetings')
      .mockImplementation(() => Promise.resolve(meetings))

    getAllMeetingsHandler({}, { send: Function.prototype })

    expect(mockedGetAllMeetings).toHaveBeenCalledTimes(1)
  })

  test('should response with proper data', () => {
    dbFunctions.getAllMeetings.mockImplementation(() =>
      Promise.resolve(meetings)
    )
    getAllMeetingsHandler(
      {},
      {
        send: value => {
          expect(value).toBe(meetings)
        }
      }
    )
  })
})
