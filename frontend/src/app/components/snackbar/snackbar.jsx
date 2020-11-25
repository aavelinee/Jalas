// modules
import React from 'react'
// components
import ErrorIcon from '@material-ui/icons/Error'
import CloseIcon from '@material-ui/icons/Close'
import { green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { makeStyles } from '@material-ui/core/styles'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Snackbar from '@material-ui/core/Snackbar'

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon
}

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'right'
  },
  margin: {
    margin: theme.spacing(1)
  },
  root: {
    margin: 0,
    left: 0,
    right: 0,
    top: 10,
    width: '100%',
    maxWidth: '100%',
    minHeight: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  contentRoot: {
    minWidth: '400px'
  }
}))

const cns = (...args) => {
  let index = 0
  let classNames = ''
  while (index < args.length) {
    classNames += !args[index] ? '' : `${args[index]} `
    index += 1
  }
  return classNames.trimEnd()
}

const AppSnackbar = ({ message, snackbarIsOpen, type, closeSnackbar }) => {
  const classes = useStyles()
  const Icon = type ? variantIcon[type] : () => null

  return (
    <Snackbar
      className={classes.root}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open={snackbarIsOpen}
      autoHideDuration={2000}
      onClose={closeSnackbar}
    >
      <SnackbarContent
        className={`${classes[type]} ${classes.contentRoot} iranyekan`}
        aria-describedby='client-snackbar'
        message={
          <span
            className={classes.message}
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              fontFamily: 'iranyekan',
              lineHeight: '21px',
              letterSpacing: '-0.1px'
            }}
          >
            <Icon className={cns(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label='close'
            color='inherit'
            onClick={closeSnackbar}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}

export default AppSnackbar
