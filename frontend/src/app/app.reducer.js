// modules
import { combineReducers } from 'redux'
// reducers
import pollListReducer from './components/pollList/pollList.reducer'
import snackBarReducer from './components/snackbar/snackbar.reducer'
import meetingPageReducer from './pages/meetingPage/meetingPage.reducer'
import votePageReducer from './pages/votePage/votePage.reducer'
import newPollReducer from './components/newPoll/newPoll.reducer'
import settingsReducer from './components/settings/settings.reducer'
import commentModalReducer from './components/commentModal/commentModal.reducer'

const initialState = {
  page: 'polls' // newPoll, polls, meetings, edit
}

const reducers = {
  SET_PAGE: (state, page) => ({ ...state, page })
}

const appReducer = (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state

export default combineReducers({
  app: appReducer,
  pollList: pollListReducer,
  snackbar: snackBarReducer,
  meetingPage: meetingPageReducer,
  votePage: votePageReducer,
  newPoll: newPollReducer,
  settings: settingsReducer,
  commentModal: commentModalReducer
})
