import {connect} from 'react-redux'
import Chart from './Chart'
import store from '../store'
import {logout} from 'APP/app/reducers/auth'

function mapStateToProps(state) {

  return {
    admin: state.admin,
    user: state.auth
  };
}
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const ChartContainer = connect(mapStateToProps, mapDispatchToProps)(Chart);
export default ChartContainer;