// modules
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from '@reach/router'
// pageComponents
import AppPage from './pages/appPage/appPage'
import MeetingPage from './pages/meetingPage/meetingPage.container'
import VotePage from './pages/votePage/votePage.container'
// components
import AppBar from './components/appBar/appBar.container'
import SnackBar from './components/snackbar/snackbar.container'
import LoginPage from './pages/loginPage/loginPage.container'
import CommentModal from './components/commentModal/commentModal.container'
import Settings from './components/settings/settings.container'
// style
import './app.css'
// setup
import store from '../setup/redux'

const App = () => (
  <Provider store={store}>
    <div className='app'>
      <SnackBar />
      <CommentModal />
      <Settings />
      <AppBar />
      <div className='body-container'>
        <LoginPage>
          <Router style={{ display: 'contents' }}>
            <AppPage path='/' />
            <MeetingPage path='/meeting/:meetingId' />
            <VotePage path='/vote/:pollId' />
          </Router>
        </LoginPage>
      </div>
    </div>
  </Provider>
)

export default App
