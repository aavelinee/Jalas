// modules
import React, { useEffect } from 'react'
// components
import Meeting from '../../components/meeting/meeting'
import CircularProgress from '@material-ui/core/CircularProgress'
// style
import '../pages.css'

export default ({ onMount, canSee, cancelled, ...meeting }) => {
  useEffect(() => {
    onMount()
  }, [])
  return (
    <div className='page-container'>
      {meeting._id ? (
        canSee ? (
          cancelled ? (
            <p className='no-access'>جلسه لغو شده است</p>
          ) : (
            <Meeting {...meeting} />
          )
        ) : (
          <p className='no-access'>شما به این جلسه دسترسی ندارید</p>
        )
      ) : (
        <CircularProgress style={{ color: '#eeeeee' }} />
      )}
    </div>
  )
}
