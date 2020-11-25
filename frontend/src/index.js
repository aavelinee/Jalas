import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/app'
import './logic/analytics/analytics'
import './index.css'
import './setup/fonts/fonts.scss'
import { getPolls } from './logic/polls/polls.request'
import { getUsers } from './logic/users/users.request'

ReactDOM.render(<App />, document.getElementById('root'))
getPolls()
getUsers()
