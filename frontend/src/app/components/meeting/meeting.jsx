// modules
import React from 'react'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
// helpers
import {
  toPersianNumber,
  convertToPersianTime,
  convertToPersianDate
} from '../../../helper/functions/date'
// style
import './meeting.css'

const MyButton = withStyles({
  root: {
    width: '100%',
    height: '100%',
    borderRadius: 0
  },
  label: {
    maxHeight: '35px'
  }
})(Button)

export default ({ title, room, startDate, endDate, canCancel, onCancel }) => {
  return (
    <div className='meeting'>
      <div
        className='meeting-header'
        style={{ border: `1px solid #f6da63`, borderBottom: 'none' }}
      >
        <div
          className='meeting-status iranyekan'
          style={{ background: '#f6da63' }}
        >
          <p>برگزار نشده</p>
        </div>
        <p className='meeting-title iranyekan'>{title}</p>
      </div>
      <div className='meeting-info iranyekan'>
        <div className='info-box'>
          <p className='info-text'>{toPersianNumber(room)}</p>
          <div className='info-tag'>اتاق</div>
        </div>
        <div className='info-box'>
          <p className='info-text'>{convertToPersianTime(new Date(endDate))}</p>
          <div className='info-tag'>پایان</div>
        </div>
        <div className='info-box'>
          <p className='info-text'>
            {convertToPersianTime(new Date(startDate))}
          </p>
          <div className='info-tag'>شروع</div>
        </div>
        <div className='info-box'>
          <p className='info-text'>
            {convertToPersianDate(new Date(startDate))}
          </p>
          <div className='info-tag'>تاریخ</div>
        </div>
      </div>
      <div
        className='meeting-actions'
        style={{ height: `${canCancel ? 35 : 0}px` }}
      >
        {canCancel ? (
          <MyButton style={{ background: '#d65555' }} onClick={onCancel}>
            <p className='meeting-actions-text iranyekan'>لغو جلسه</p>
          </MyButton>
        ) : null}
      </div>
    </div>
  )
}
