// modules
import React from 'react'
// components
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import CircularProgress from '@material-ui/core/CircularProgress'
import Room from '../room/room.container'
// helper
import {
  formatTimeRange,
  toPersianNumber
} from '../../../../../helper/functions/date'
// style
import './option.css'

const MyButton = withStyles({
  label: {
    maxHeight: '40px'
  }
})(Button)

const useStyles = makeStyles(() => ({
  innerPaper: {
    width: 'calc(100% - 30px)',
    marginBottom: '15px !important',
    background: '#7f8691',
    borderRadius: '10px !important',
    overflow: 'hidden',
    padding: 0
  },
  expanded: {
    marginTop: '0 !important'
  },
  details: {
    padding: 0,
    minHeight: 70
  }
}))

export default ({
  pollId,
  startDate,
  endDate,
  positives,
  negatives,
  neutrals,
  rooms,
  expanded,
  disabled,
  isLoading,
  onChange
}) => {
  const classes = useStyles()
  return (
    <ExpansionPanel
      classes={{ root: classes.innerPaper, expanded: classes.expanded }}
      expanded={expanded}
      onChange={onChange}
      disabled={disabled}
    >
      <ExpansionPanelSummary
        aria-controls='panel1a-content'
        id='panel1a-header'
        style={{
          padding: 0,
          height: '40px',
          minHeight: '40px',
          borderRadius: 0
        }}
      >
        <MyButton
          style={{
            height: '100%',
            width: '100%',
            background: '#7f8691',
            cursor: 'pointer',
            textTransform: 'none',
            padding: '0',
            borderRadius: 0
          }}
        >
          <div
            className='option'
            style={{ borderBottom: expanded ? '2px solid #393e46' : 'none' }}
          >
            <div className='option-votes'>
              <div className='option-neutral option-vote iranyekan'>
                <p>{toPersianNumber(neutrals.length)}</p>
              </div>
              <div className='option-positive option-vote iranyekan'>
                <p>+{toPersianNumber(positives.length)}</p>
              </div>
              <div className='option-negative option-vote iranyekan'>
                <p>-{toPersianNumber(negatives.length)}</p>
              </div>
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
        </MyButton>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.details }}>
        {isLoading ? (
          <div className='option-loading'>
            <CircularProgress style={{ color: '#232931' }} />
          </div>
        ) : rooms.length ? (
          <div className='option-rooms'>
            {rooms.map(room => (
              <Room key={room} pollId={pollId} roomNumber={room} />
            ))}
          </div>
        ) : (
          <div className='no-rooms iranyekan'>اتاقی موجود نیست</div>
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}
