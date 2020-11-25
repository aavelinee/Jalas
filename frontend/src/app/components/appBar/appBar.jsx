// modules
import React from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
// style
import './appBar.css'

const SettingsButton = withStyles({
  root: {
    width: '30px',
    height: '30px',
    minWidth: '30px',
    borderRadius: '50%',
    color: '#eeeeee',
    marginLeft: 15,
    padding: 0,
    '&:hover': {
      background: '#3486bd !important'
    }
  }
})(Button)

export default ({ onSettingsClick }) => (
  <div className='app-bar iranyekan'>
    <SettingsButton onClick={onSettingsClick}>
      <SettingsIcon />
    </SettingsButton>
    <p>سامانه جلس</p>
  </div>
)
