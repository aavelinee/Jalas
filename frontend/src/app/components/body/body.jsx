// modules
import React from 'react'
// components
import NewPoll from '../newPoll/newPoll.container'
import PollList from '../pollList/pollList.container'
import MeetingList from '../meetingList/meetingList.container'
// style
import './body.css'

export default ({ page }) => (
  <div className='body'>
    {page === 'polls' ? (
      <PollList />
    ) : page === 'meetings' ? (
      <MeetingList />
    ) : page === 'newPoll' || page === 'edit' ? (
      <NewPoll />
    ) : null}
  </div>
)
