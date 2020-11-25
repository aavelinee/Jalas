// modules
import React from 'react'
// components
import Poll from '../poll/poll.container'

export default ({ polls }) =>
  polls.length ? (
    <div className='list'>
      {polls.map(poll => (
        <Poll key={poll.id} {...poll} />
      ))}
    </div>
  ) : (
    <div className='no-meetings iranyekan'>
      <p>نظرسنجی ای وجود ندارد</p>
    </div>
  )
