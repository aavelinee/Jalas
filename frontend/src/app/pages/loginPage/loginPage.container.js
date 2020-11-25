// modules
import { connect } from 'react-redux'
// components
import LoginPage from './loginPage'
// actions
import { dispatchSetSnackbarMessage } from '../../components/snackbar/snackbar.actions'
// requests
import { authenticateUser } from '../../../logic/user/user.request'
// views
import { getUserId } from '../../../logic/user/user.reducer'

const mapStateToProps = () => ({ userId: getUserId() })

const mapDispatchToProps = () => ({
  onLogin: (email, pass) => {
    if (!email || !pass) {
      dispatchSetSnackbarMessage({
        type: 'error',
        message: 'لطفا اطلاعات خواسته شده را وارد کنید'
      })
      return
    }
    authenticateUser(email, pass)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
