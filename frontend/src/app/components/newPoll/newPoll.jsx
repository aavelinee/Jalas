// modules
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
// components
import TextField from '../../../helper/components/textField/textField'
import Participant from './components/participant/participant'
import OptionPicker from './components/optionPicker/optionPicker'
import DatePicker from '../../../helper/components/datePicker/datePicker'
import TimePicker from '../../../helper/components/timePicker/timePicker'
// style
import './newPoll.css'

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

const AddButton = withStyles({
  root: {
    width: '100%',
    height: '35px',
    padding: '0 0 5px',
    marginBottom: 10,
    background: '#393e46',
    borderRadius: 10,
    color: '#eeeeee',
    fontSize: 24,
    '&:hover': {
      background: '#4befb9 !important',
      color: '#232931 !important'
    }
  },
  label: {
    maxHeight: '32px'
  }
})(Button)

export default ({
  title,
  options,
  participants,
  editMode,
  deadline,
  // hendlers
  createPoll,
  editPoll,
  setTitle,
  setDeadline,
  addOption,
  removeOption,
  updateOption,
  addParticipant,
  removeParticipant,
  updateParticipant
}) => (
  <div className='new-poll'>
    <div className='form'>
      <p className='title'>عنوان</p>
      <TextField
        value={title}
        placeholder='عنوان نظرسنجی را وارد کنید'
        onChange={setTitle}
      />
      <p style={{ marginTop: 15 }} className='title'>
        گزینه‌ها
      </p>
      {options.map(({ id, ...option }) => (
        <OptionPicker
          {...option}
          key={id}
          update={updateOption(id)}
          onDelete={() => removeOption(id)}
        />
      ))}
      <AddButton onClick={addOption}>+</AddButton>
      <p className='title'>مدعوین</p>
      {participants.map(({ id, value }) => (
        <Participant
          key={id}
          value={value}
          update={updateParticipant(id)}
          onDelete={() => removeParticipant(id)}
        />
      ))}
      <AddButton onClick={addParticipant}>+</AddButton>
      <div className='new-poll-deadline'>
        <div className='new-poll-deadline-pickers'>
          <TimePicker label='زمان' value={deadline} onChange={setDeadline} />
          <DatePicker label='تاریخ' value={deadline} onChange={setDeadline} />
        </div>
        <p style={{ marginTop: 15 }} className='new-poll-deadline-title'>
          زمان اتمام
        </p>
      </div>
    </div>
    <MyButton onClick={() => (editMode ? editPoll() : createPoll())}>
      <p className='button-text iranyekan'>
        {editMode ? 'ویرایش نظرسنجی' : 'ایجاد نظرسنجی'}
      </p>
    </MyButton>
  </div>
)
