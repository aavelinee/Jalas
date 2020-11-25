// modules
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Send from '@material-ui/icons/Send'

const SendButton = withStyles({
  root: {
    width: '35px',
    height: '35px',
    minWidth: '35px',
    background: '#4f98ca',
    borderRadius: '50%',
    color: '#eeeeee',
    marginRight: 20,
    padding: 0,
    '&:hover': {
      background: '#3486bd !important'
    }
  },
  label: {
    maxHeight: '32px',
    maxWidth: '40px'
  }
})(Button)

export default ({ onClick }) => (
  <SendButton onClick={onClick}>
    <Send
      style={{
        transform: 'rotate(180deg)',
        width: 20,
        height: 20,
        marginRight: 3
      }}
    />
  </SendButton>
)
