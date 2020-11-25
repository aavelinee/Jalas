// modules
import { connect } from 'react-redux'
// components
import SideBar from './sideBar'
// actions
import { dispatchSetPage } from '../../app.action'
import { dispatchResetPoll } from '../newPoll/newPoll.action'
// setup
import { getState } from '../../../setup/redux'

const mapStateToProps = state => ({
  page: state.view.app.page
})

const mapDispatchToProps = () => ({
  setPage: page => {
    if (page === 'newPoll' && getState().view.app.page !== 'newPoll')
      dispatchResetPoll()
    dispatchSetPage(page)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)
