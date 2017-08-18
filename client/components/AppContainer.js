import { connect } from 'react-redux';
import {fileDrop, changeVAT, submit} from '../reducers/PDFReducer'
console.log(fileDrop);
import App from './App.js';

function mapStateToProps(state) {
  // TODO
  return {
      pdf: state.pdf
  };
}

function mapDispatchToProps(dispatch) {
  // TODO
  return {
      fileDrop: (file) => dispatch(fileDrop(file)),
      onChange: (val) => dispatch(changeVAT(val)),
      submit: () => dispatch(submit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
