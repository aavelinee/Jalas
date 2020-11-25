// modules
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Reply from '@material-ui/icons/Reply'

const ReplyButton = withStyles({
  root: {
    width: '21px',
    height: '21px',
    minWidth: '21px',
    background: '#f6da63',
    borderRadius: '50%',
    color: '#393e46',
    marginRight: 10,
    marginBottom: 2,
    padding: 0,
    '&:hover': {
      background: '#f1a632 !important'
    }
  }
})(Button)

export default ({ onClick }) => (
  <ReplyButton onClick={onClick}>
    <Reply
      style={{
        width: 17,
        height: 17,
        marginBottom: 2
      }}
    />
  </ReplyButton>
)
