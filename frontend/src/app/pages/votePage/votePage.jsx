// modules
import React, { useEffect } from 'react'
// components
import Poll from '../../components/poll/poll.container'
import CircularProgress from '@material-ui/core/CircularProgress'
// style
import '../pages.css'

export default ({ onMount, canSee, ...poll }) => {
  useEffect(() => {
    onMount()
  }, [])
  return (
    <div className='page-container'>
      {poll._id ? (
        canSee ? (
          <Poll {...poll} noAction />
        ) : (
          <p className='no-access'>شما به این نظرسنجی دسترسی ندارید</p>
        )
      ) : (
        <CircularProgress style={{ color: '#eeeeee' }} />
      )}
    </div>
  )
}
