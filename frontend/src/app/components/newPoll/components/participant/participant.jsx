// modules
import React from 'react'
// components
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import TextField from '../../../../../helper/components/textField/textField'
// style
import './participant.css'

const DeleteButton = withStyles({
  root: {
    width: '40px',
    height: '40px',
    minWidth: '40px',
    background: '#d65555',
    borderRadius: '50%',
    color: '#eeeeee',
    marginRight: 25,
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

export default ({ value, update, onDelete }) => (
  <div className='participant'>
    <DeleteButton onClick={onDelete}>
      <Delete />
    </DeleteButton>
    <TextField
      value={value}
      onChange={update}
      placeholder='ایمیل فرد مورد نظر را وارد کنید'
    />
  </div>
)
