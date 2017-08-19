import {fileUpload} from '../API/FileUpload';
import _ from 'lodash';

export const FILE_DROP = 'PDF/FILE_DROP';
export const SUBMIT = 'PDF/SUBMIT';
export const ERROR = 'PDF/ERROR';
export const VATS_RECEIVED = 'PDF/VATS_RECEIVED';
export const VAT_CHANGE = 'PDF/VAT_CHANGE';


export const fileDropUnit = (file) => {
    return {
        type: FILE_DROP,
        file: file
    }
}
export const fileDrop = (file) => {
    return (dispatch, getState) => {
        dispatch(fileDropUnit(file));

        const { fieldtext } = getState().pdf;

        fileUpload(file, fieldtext).then((data) => {
            dispatch(VATSReceived(data.data.vatsNumbers))
        }).catch((err) => {
            dispatch(VATSError())

        })
    }
}

export const VATSReceived = (vats) => {
    return {
        type: VATS_RECEIVED,
        vats: vats
    }
}

export const VATSError = () => {
    return {
        type: ERROR
    }
}

export const changeVAT = (value) => {
    return {
        type: VAT_CHANGE,
        value: value
    }
}

export const defaultState = {
    fieldtext: '',
    file: null,
    VATs: null,
    loading: false
}

export default (state = defaultState, action) => {
  // TODO
  let cState = _.cloneDeep(state);
  switch(action.type) {
      case FILE_DROP: 
         cState.file = action.file;
         cState.VATs = null;
         cState.loading = true;
         return cState;
      case VAT_CHANGE: 
         cState.fieldtext = action.value;
         return cState;
      case ERROR: 
         cState.loading = false;
         cState.VATs = [];
         return cState;
      case VATS_RECEIVED: 
         cState.loading = false;
         cState.VATs = action.vats;
         return cState;
      break;
  }
  return state;
}
