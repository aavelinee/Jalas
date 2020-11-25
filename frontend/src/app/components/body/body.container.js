// modules
import { connect } from 'react-redux'
// components
import Body from './body'

const mapStateToProps = state => ({
  page: state.view.app.page
})

export default connect(mapStateToProps)(Body)
