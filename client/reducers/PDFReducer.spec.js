import reducer from './PDFReducer';
import * as PDF from './PDFReducer';
import _ from 'lodash';

describe('reducers', () => {
  describe('PDF', () => {
    it('testing fileDrop action', () => {
      expect(PDF.fileDropUnit({})).toEqual({
          type: PDF.FILE_DROP,
          file: {}
      });

      expect(reducer(PDF.defaultState, {type: PDF.FILE_DROP, file: {}})).toEqual({
          file: {},
          fieldtext: '',
          VATs: null,
          loading: true
      })
    });

    it('testing error dispatch', () => {
      expect(PDF.VATSError()).toEqual({
          type: PDF.ERROR
      });

      let state = _.cloneDeep(PDF.defaultState);
      state.loading = true;
      state.file = {};

      expect(reducer(state, {type: PDF.ERROR})).toEqual({
          file: {},
          fieldtext: '',
          VATs: [],
          loading: false
      })

    });

    it('testing VATs received', () => {
      expect(PDF.VATSReceived(["22"])).toEqual({
          type: PDF.VATS_RECEIVED,
          vats: ["22"]
      });

      let state = _.cloneDeep(PDF.defaultState);
      state.loading = true;
      state.file = {};

      expect(reducer(state, {type: PDF.VATS_RECEIVED, vats: ["22"]})).toEqual({
          file: {},
          fieldtext: '',
          VATs: ["22"],
          loading: false
      })

    });

    it('testing field change action', () => {
      expect(PDF.changeVAT("val")).toEqual({
          type: PDF.VAT_CHANGE,
          value: "val" 
      });

      expect(reducer(PDF.defaultState, {type: PDF.VAT_CHANGE, value: "val"})).toEqual({
          file: null,
          fieldtext: 'val',
          VATs: null,
          loading: false
      })

    });
    
  });
});
