// modules
import React from 'react'
// components
import { withStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
// helper
import {
  formatTimeRange,
  toPersianNumber
} from '../../../../../helper/functions/date'
// style
import './votableOption.css'

const MyButton = withStyles({
  root: {
    width: '60px',
    padding: 0,
    height: '100%',
    cursor: 'pointer',
    textTransform: 'none',
    borderRadius: 0,
    '&:hover': {
      background: ({ color }) =>
        color === 'red'
          ? '#ec6f6f !important'
          : color === 'green'
          ? '#afec66 !important'
          : '#9c9696 !important'
    }
  },
  label: {
    minHeight: '40px',
    maxHeight: '40px'
  }
})(({ color, ...other }) => <Button {...other} />)

export default ({
  endDate,
  disabled,
  startDate,
  positives,
  negatives,
  neutrals,
  onClick
}) => (
  <div className='vote-option'>
    <div className='vote-option-votes'>
      <MyButton
        disabled={disabled}
        style={{ background: '#afafaf' }}
        onClick={() => onClick(0)}
        color='gray'
      >
        <p className='vote-option-vote iranyekan'>
          {toPersianNumber(neutrals.length)}
        </p>
      </MyButton>
      <MyButton
        disabled={disabled}
        style={{ background: '#9bd655' }}
        onClick={() => onClick(1)}
        color='green'
      >
        <p className='vote-option-vote iranyekan'>
          +{toPersianNumber(positives.length)}
        </p>
      </MyButton>
      <MyButton
        disabled={disabled}
        style={{ background: '#d65555' }}
        onClick={() => onClick(-1)}
        color='red'
      >
        <p className='vote-option-vote iranyekan'>
          -{toPersianNumber(negatives.length)}
        </p>
      </MyButton>
    </div>
    <Typography
      className='iranyekan'
      style={{
        marginRight: '10px',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: '21px',
        letterSpacing: '-0.08px',
        color: '#232931'
      }}
    >
      {formatTimeRange(new Date(startDate), new Date(endDate))}
    </Typography>
  </div>
)
