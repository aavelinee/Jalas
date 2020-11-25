// modules
import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
// components
import TextField from '../../../helper/components/textField/textField'
// style
import '../pages.css'

const MyButton = withStyles({
  root: {
    width: '100%',
    height: '40px',
    background: '#4ecca3',
    borderRadius: 0,
    '&:hover': {
      background: '#4befb9 !important'
    }
  },
  label: {
    maxHeight: '35px'
  }
})(Button)

export default ({ userId, children, onLogin }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  return userId ? (
    { ...children }
  ) : (
    <div className='page-container'>
      <div className='login-box'>
        <div className='form'>
          <p className='title'>ایمیل</p>
          <TextField
            value={email}
            placeholder='ایمیل خود را وارد کنید'
            onChange={setEmail}
          />
          <p className='title' style={{ marginTop: 10 }}>
            رمز عبور
          </p>
          <TextField
            value={pass}
            placeholder='رمز عبور خود را وارد کنید'
            onChange={setPass}
          />
        </div>
        <MyButton onClick={() => onLogin(email, pass)}>
          <p className='button-text iranyekan'>ورود</p>
        </MyButton>
      </div>
    </div>
  )
}
