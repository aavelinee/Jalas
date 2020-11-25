// modules
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// components
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '../../../helper/components/textField/textField'
// styles
import './commentModal.css'

const useStyles = makeStyles({
  paper: {
    minWidth: 400,
    background: '#21242b',
    borderRadius: 15,
    border: '1px solid #4ecca3'
  }
})

export default ({ value, isOpen, onChangeValue, onSubmit, onClose }) => {
  const classes = useStyles()
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
      classes={{
        paper: classes.paper
      }}
    >
      <p className='modal-title iranyekan'>نظر خود را وارد کنید</p>
      <DialogContent>
        <TextField
          value={value}
          onChange={onChangeValue}
          onSubmit={onSubmit}
          placeholder='نظر موردنظر خود را وارد کنید'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <p className='modal-button-text iranyekan'>لغو</p>
        </Button>
        <Button onClick={onSubmit}>
          <p className='modal-button-text iranyekan'>ثبت</p>
        </Button>
      </DialogActions>
    </Dialog>
  )
}
