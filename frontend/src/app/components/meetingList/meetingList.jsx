// modules
import React from 'react'
// components
import Meeting from '../meeting/meeting.container'

export default ({ meetings }) =>
  meetings.length ? (
    <div className='list'>
      {meetings.map(meeting => (
        <Meeting key={meeting._id} {...meeting} />
      ))}
    </div>
  ) : (
    <div className='no-meetings iranyekan'>
      <p>جلسه ای وجود ندارد</p>
    </div>
  )
