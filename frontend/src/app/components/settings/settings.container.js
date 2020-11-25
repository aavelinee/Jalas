// modules
import { connect } from 'react-redux'
// components
import Settings from './settings'
// actions
import { dispatchSetSetting, dispatchResetSettings } from './settings.action'
// requests
import { updateUser } from '../../../logic/user/user.request'
// redux
import { getState } from '../../../setup/redux'

const mapStateToProps = state => {
  const { isOpen, notification = {} } = state.view.settings
  return {
    isOpen,
    values: notification,
    items: [
      {
        key: 'onArrangeMeeting',
        label: 'ساخت جلسه'
      },
      {
        key: 'onCancelMeeting',
        label: 'لغو جلسه'
      },
      {
        key: 'onMention',
        label: 'اشاره شدن در نظرها'
      },
      {
        key: 'onInvitation',
        label: 'دعوت به جلسه'
      },
      {
        key: 'onRemovedFromPoll',
        label: 'حذف از جلسه'
      },
      {
        key: 'onEditPoll',
        label: 'ویرایش نظرسنجی'
      },
      {
        key: 'onClosePoll',
        label: 'بسته شدن نظرسنجی'
      },
      {
        key: 'onVote',
        label: 'رای به نظرسنجی'
      }
    ]
  }
}

const mapDispatchToProps = () => ({
  onChange: (key, value) =>
    dispatchSetSetting({
      value,
      path: ['notification', key]
    }),
  onClose: dispatchResetSettings,
  onSubmit: () => {
    const { isOpen, ...settings } = getState().view.settings
    updateUser({ settings })
    dispatchResetSettings()
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
