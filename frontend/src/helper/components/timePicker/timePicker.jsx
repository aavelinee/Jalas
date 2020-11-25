import React from 'react'
import jMoment from 'moment-jalaali'
import JalaliUtils from '@date-io/jalaali'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
// helper
import { toPersian } from '../../functions/date'

jMoment.loadPersian({ dialect: 'persian-modern' })

// style
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100px'
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
    marginTop: '5px',
    '& input': {
      textAlign: 'center',
      fontWeight: 500,
      padding: 6
    }
  },
  small: {
    width: 85
  },
  datePicker: {
    marginTop: 0,
    fontSize: 16
  },
  typography: {
    fontSize: 14,
    lineHeight: '21px',
    letterSpacing: -0.08,
    fontWeight: 500,
    color: '#eeeeee',
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
        <div className={classes.pickerContainer}>
          <TimePicker
            className={classes.datePicker}
            clearable
            okLabel='تأیید'
            cancelLabel='لغو'
            clearLabel='پاک کردن'
            ampm={false}
            labelFunc={date => (date ? toPersian(date.format('hh:mm')) : '')}
            value={value}
            onChange={value => onChange(new Date(value))}
            TextFieldComponent={InputBase}
            inputProps={{
              className: classes.input
            }}
          />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  )
}

export default Picker
