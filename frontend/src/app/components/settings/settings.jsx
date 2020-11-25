// modules
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// components
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Switch from '@material-ui/core/Switch'
// styles
import './settings.css'

const useStyles = makeStyles({
  paper: {
    minWidth: 300,
    background: '#21242b',
    borderRadius: 15,
    border: '1px solid #4ecca3'
  }
})

export default ({ items, values, isOpen, onChange, onSubmit, onClose }) => {
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
      <p className='modal-title iranyekan'>اعلان ها</p>
      <DialogContent>
        {items.map(({ key, label }) => (
          <div className='settings-item'>
            <Switch
              checked={values[key]}
              onChange={e => onChange(key, e.target.checked)}
            />
            <p className='iranyekan'>{label}</p>
          </div>
        ))}
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
