// modules
import React from 'react'
// components
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
// helpers
import { toPersianNumber } from '../../../../../helper/functions/date'
// style
import './room.css'

const MyButton = withStyles({
  label: {
    height: '80px'
  }
})(Button)

export default ({ roomNumber, selected, onClick }) => (
  <MyButton
    style={{
      width: '60px',
      height: '80px',
      borderRadius: '10px',
      overflow: 'hidden',
      marginLeft: '10px',
      marginTop: '10px',
      cursor: 'pointer',
      textTransform: 'none',
      padding: '0'
    }}
    onClick={onClick}
  >
    <div className={`room ${selected ? 'room-selected' : ''}`}>
      <p className='iranyekan'>اتاق</p>
      <p className='iranyekan room-number'>{toPersianNumber(roomNumber)}</p>
    </div>
  </MyButton>
)
