import React from 'react'
import JalaliUtils from '@date-io/jalaali'
import { makeStyles } from '@material-ui/core/styles'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Typography } from '@material-ui/core'
import InputBase from '@material-ui/core/InputBase'
// helpers
import { formattedPersianDate } from '../../functions/date'

// style
const useStyles = makeStyles(() => ({
  root: {
    width: '100px'
  },
  pickerComponent: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '5px'
  },
  pickerContainer: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #818181',
    borderRadius: 11,
    boxSizing: 'border-box',
    width: '100%',
    height: 35,
    '& input': {
      textAlign: 'center',
      fontWeight: 500,
      padding: 6
    }
  },
  datePicker: {
    marginTop: 0,
    width: '100%',
    textAlign: 'right',
    fontSize: 16
  },
  typography: {
    fontSize: 14,
    lineHeight: '21px',
    letterSpacing: -0.08,
    fontWeight: 500,
    color: '#eee',
    textAlign: 'right',
    fontFamily: 'iranyekan',
    margin: '0 5px 5px 0'
  },
  input: {
    color: '#eee',
    fontFamily: 'iranyekan',
    textAlign: 'center',
    fontSize: 14
  }
}))

const Picker = ({ label, value, onChange }) => {
  const classes = useStyles()
  return (
    <MuiPickersUtilsProvider utils={JalaliUtils} locale='fa'>
      <div className={classes.root}>
        <Typography className={classes.typography}>{label}</Typography>
        <div className={classes.pickerComponent}>
          <div className={classes.pickerContainer}>
            <DatePicker
              className={classes.datePicker}
              clearable
              okLabel='تأیید'
              cancelLabel='لغو'
              clearLabel='پاک کردن'
              labelFunc={date => (date ? formattedPersianDate(date) : '')}
              value={value}
              TextFieldComponent={InputBase}
              inputProps={{
                className: `${classes.input}`
              }}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default Picker
