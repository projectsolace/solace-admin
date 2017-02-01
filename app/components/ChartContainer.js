import {connect} from 'react-redux'
import Chart from './Chart'
import store from '../store'

function mapStateToProps(state) {

  return {
    admin: state.admin
  };
}
function mapDispatchToProps(state) {
  return {
  };
}
const ChartContainer = connect(mapStateToProps, mapDispatchToProps)(Chart);
export default ChartContainer;