import { combineReducers } from 'redux';
import pdfReducer from './reducers/PDFReducer';

export default combineReducers({
  pdf: pdfReducer
});
