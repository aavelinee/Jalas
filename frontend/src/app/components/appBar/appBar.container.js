// modules
import { connect } from 'react-redux'
// components
import AppBar from './appBar'
// actions
import { dispatchOpenSettings } from '../settings/settings.action'
// views
import { getUserSettings } from '../../../logic/user/user.reducer'

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({
  onSettingsClick: () => dispatchOpenSettings(getUserSettings())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
