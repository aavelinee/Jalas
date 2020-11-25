// modules
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Edit from '@material-ui/icons/Edit'

const EditButton = withStyles({
  root: {
    width: '30px',
    height: '30px',
    minWidth: '30px',
    background: '#4f98ca',
    borderRadius: '50%',
    color: '#eeeeee',
    marginLeft: 15,
    padding: 0,
    '&:hover': {
      background: '#3486bd !important'
    }
  }
})(Button)

export default ({ onClick }) => (
  <EditButton onClick={onClick}>
    <Edit
      style={{
        width: 20,
        height: 20
      }}
    />
  </EditButton>
)
