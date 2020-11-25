// modules
import { combineReducers } from 'redux'
// reducers
import userReducer from '../user/user.reducer'
import usersReducer from '../users/users.reducer'
import pollsReducer from '../polls/polls.reducer'
import roomsReducer from '../rooms/rooms.reducer'
import meetingsReducer from '../meetings/meetings.reducer'
import commentsReducer from '../comments/comments.reducer'

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  polls: pollsReducer,
  rooms: roomsReducer,
  comments: commentsReducer,
  meetings: meetingsReducer
})
