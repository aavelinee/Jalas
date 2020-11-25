// modules
import React, { Fragment } from 'react'
import Highlighter from 'react-highlight-words'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
// helper
import ReplyButton from '../../../../../helper/components/replyButton/replyButton'
import { formattedCommentDate } from '../../../../../helper/functions/date'
// style
import './comment.css'

const DeleteButton = withStyles({
  root: {
    width: '35px',
    height: '35px',
    minWidth: '35px',
    background: '#d65555',
    borderRadius: '50%',
    color: '#eeeeee',
    marginRight: 10,
    padding: 0,
    '&:hover': {
      background: '#a23e3e !important'
    }
  },
  label: {
    maxHeight: '32px',
    maxWidth: '40px'
  }
})(Button)

const EditButton = withStyles({
  root: {
    width: '35px',
    height: '35px',
    minWidth: '35px',
    background: '#4f98ca',
    borderRadius: '50%',
    color: '#eeeeee',
    marginRight: 25,
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

export default ({
  content,
  firstname,
  lastname,
  date,
  level,
  canDelete,
  canReply,
  onDelete,
  onReply,
  onEdit
}) => (
  <div
    className='comment iranyekan'
    style={{
      paddingRight: 20 + level * 30
    }}
  >
    <div className='comment-header'>
      {canReply && <ReplyButton onClick={onReply} />}
      <p className='comment-header-text iranyekan'>
        {formattedCommentDate(new Date(date))}
        {' | '}
        {firstname && lastname ? `${firstname} ${lastname}` : 'loading'}
      </p>
    </div>
    <div className='comment-body'>
      {canDelete ? (
        <Fragment>
          <DeleteButton onClick={onDelete}>
            <Delete
              style={{
                width: 25,
                height: 25
              }}
            />
          </DeleteButton>
          <EditButton onClick={onEdit}>
            <Edit
              style={{
                width: 25,
                height: 25
              }}
            />
          </EditButton>
        </Fragment>
      ) : null}
      <p className='comment-text'>
        <Highlighter
          highlightClassName='mention-text'
          searchWords={[/@(\S)+/g]}
          textToHighlight={content}
        />
      </p>
    </div>
  </div>
)
