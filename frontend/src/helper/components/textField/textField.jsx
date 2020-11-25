import React from 'react'
import PropTypes from 'prop-types'
// components
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  inputContainer: {
    border: '1.5px solid #818181',
    borderRadius: 11,
    height: 40
  },
  singleLineInput: {
    width: '100%'
  },
  input: {
    fontSize: 14,
    lineHeight: '21px',
    letterSpacing: -0.08,
    padding: '7px 9px',
    color: '#eeeeee',
    fontFamily: 'iranyekan',

    '&::placeholder': {
      color: '#eeeeee88',
      opacity: 1,
      fontSize: 14,
      direction: 'rtl',
      textAlign: 'right'
    }
  }
}))

const SingleLineInput = ({
  placeholder,
  onChange,
  value,
  onSubmit = Function.prototype
}) => {
  const classes = useStyles()
  return (
    <div className={classes.singleLineInput}>
      <Input
        disableUnderline
        onChange={e => onChange(e.target.value)}
        className={classes.inputContainer}
        classes={{ input: classes.input }}
        inputProps={{
          dir: 'auto',
          onKeyDown: e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onSubmit()
            }
          }
        }}
        fullWidth
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}

SingleLineInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
}
SingleLineInput.defaultProps = {
  type: 'text'
}

export default SingleLineInput
