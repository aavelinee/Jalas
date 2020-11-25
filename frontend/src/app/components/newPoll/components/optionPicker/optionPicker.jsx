// modules
import React from 'react'
// components
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import DatePicker from '../../../../../helper/components/datePicker/datePicker'
import TimePicker from '../../../../../helper/components/timePicker/timePicker'
// style
import './optionPicker.css'

const DeleteButton = withStyles({
  root: {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    background: '#d65555',
    borderRadius: '50%',
    color: '#eeeeee',
    marginRight: 15,
    padding: 0,
    '&:hover': {
      background: '#a23e3e !important'
    }
  },
  label: {
    maxHeight: '32px',
    maxWidth: '40px'
  }
})(Button)

export default ({ date, start, end, update, onDelete }) => (
  <div className='option-picker'>
    <DeleteButton onClick={onDelete}>
      <Delete />
    </DeleteButton>
    <TimePicker label='پایان' value={end} onChange={update('end')} />
    <TimePicker label='شروع' value={start} onChange={update('start')} />
    <DatePicker label='تاریخ' value={date} onChange={update('date')} />
  </div>
)

// const arr = [1, -2, 3, 4, -1, 7]
// arr.filter(num => num > 0).forEach(num => console.log(num))
