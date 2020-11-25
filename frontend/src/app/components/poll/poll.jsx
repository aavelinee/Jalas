// modules
import React, { useState } from 'react'
// components
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import TextField from '../../../helper/components/textField/textField'
import Comment from './components/comment/comment.container'
import Option from './components/option/option.container'
import VotableOption from './components/votableOption/votableOption'
import SendButton from '../../../helper/components/sendButton/sendButton'
import EditButton from '../../../helper/components/editButton/editButton'
// helpers
import { toPersianNumber } from '../../../helper/functions/date'
// style
import './poll.css'

const MyButton = withStyles({
  root: {
    width: '100%',
    height: '100%',
    borderRadius: 0
  },
  label: {
    maxHeight: '35px'
  }
})(Button)

export default ({
  id,
  name,
  closed,
  options,
  comments,
  action,
  optionType,
  reservingRoom,
  disabledOptions,
  canVote,
  canEdit,
  onCreate,
  onCancel,
  onClose,
  onEdit,
  votePoll,
  onSubmitComment
}) => {
  const statusColor = closed ? '#d65555' : '#f6da63'
  const [body, setBody] = useState('')
  return (
    <div className='poll'>
      <div
        className='poll-header'
        style={{ border: `1px solid ${statusColor}`, borderBottom: 'none' }}
      >
        <div
          className='poll-status iranyekan'
          style={{ background: statusColor }}
        >
          <p>{closed ? 'بسته شده' : 'در جریان'}</p>
        </div>
        <span className='poll-title'>
          <p className='poll-name iranyekan'>{name}</p>
          {canEdit ? <EditButton onClick={onEdit} /> : null}
        </span>
      </div>
      <div className='poll-scrollable'>
        <div className='poll-body'>
          {options.map((option, index) =>
            optionType === 'vote' ? (
              <VotableOption
                key={option.id}
                disabled={disabledOptions}
                onClick={votePoll(index)}
                {...option}
              />
            ) : (
              <Option
                key={option.id}
                pollId={id}
                disabled={disabledOptions}
                {...option}
              />
            )
          )}
          {comments.map(comment => (
            <Comment
              key={comment._id}
              canReply={!closed && canVote}
              {...comment}
            />
          ))}
          {closed || !canVote ? (
            <div style={{ minHeight: 10 }} />
          ) : (
            <div className='poll-new-comment'>
              <SendButton
                onClick={() => {
                  onSubmitComment(body)
                  setBody('')
                }}
              />
              <span style={{ width: 'calc(100% - 60px)' }}>
                <TextField
                  value={body}
                  onChange={setBody}
                  onSubmit={() => {
                    onSubmitComment(body)
                    setBody('')
                  }}
                  placeholder='نظر موردنظر خود را وارد کنید'
                />
              </span>
            </div>
          )}
        </div>
      </div>
      <div className='poll-actions' style={{ height: `${action ? 35 : 0}px` }}>
        {action === 'close' ? (
          <MyButton style={{ background: '#d65555' }} onClick={onClose}>
            <p className='poll-actions-text iranyekan'>بستن نظرسنجی</p>
          </MyButton>
        ) : action === 'create' ? (
          <MyButton style={{ background: '#4ecca3' }} onClick={onCreate}>
            <p className='poll-actions-text iranyekan'>ایجاد جلسه</p>
          </MyButton>
        ) : action === 'cancel' ? (
          <div
            className='poll-actions-content'
            style={{ background: '#f6da63' }}
          >
            <MyButton
              style={{
                background: '#d65555',
                width: 60,
                height: 30,
                marginRight: 10,
                borderRadius: 5
              }}
              onClick={onCancel}
            >
              <p className='iranyekan poll-actions-cancel'>لغو</p>
            </MyButton>
            <p className='poll-actions-text iranyekan'>{`در حال رزرو اتاق ${toPersianNumber(
              reservingRoom
            )}`}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
