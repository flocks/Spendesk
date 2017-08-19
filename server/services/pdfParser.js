let fs = require('fs'),
    PDFParser = require("pdf2json");

const _ = require("lodash");


const regex = /^((AT)U[0-9]{8}|(BE)0[0-9]{9}|(BG)[0-9]{9,10}|(CY)[0-9]{8}L|(CZ)[0-9]{8,10}|(DE)[0-9]{9}|(DK)[0-9]{8}|(EE)[0-9]{9}|(EL|GR)[0-9]{9}|(ES)[0-9A-Z][0-9]{7}[0-9A-Z]|(FI)[0-9]{8}|(FR)[0-9A-Z]{2}[0-9]{9}|(GB)([0-9]{9}([0-9]{3})|[A-Z]{2}[0-9]{3})|(HU)[0-9]{8}|(IE)[0-9]{7}L|(IT)[0-9]{11}|(LT)([0-9]{9}|[0-9]{12})|(LU)[0-9]{8}|(LV)[0-9]{11}|(MT)[0-9]{8}|(NL)[0-9]{9}B[0-9]{2}|(PL)[0-9]{10}|(PT)[0-9]{9}|(RO)[0-9]{2,10}|(SE)[0-9]{12}|(SI)[0-9]{8}|(SK)[0-9]{10})$/g
//

const getAllSubstrings = (str) => {
  var i, j, result = [];

  for (i = 0; i < str.length; i++) {
      for (j = i + 1; j < str.length + 1; j++) {
          result.push(str.slice(i, j));
      }
  }
  return result;
}

const iterate = (obj, stack, result) => {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                iterate(obj[property], stack + '.' + property, result);
            } else {
                if (typeof obj[property] === "string" && obj[property] !== "") {
                    const value =  obj[property].replace(/\s/g, '');
                    const strings = getAllSubstrings(value);
                    for (var i = 0; i < strings.length; i++) {
                        const isVAT = regex.test(strings[i])
                        if (isVAT) {
                            result.push(strings[i])
                        }
                    }
                }
            }
        }
    }
}

const  extractKeyFromJson = (object, key, excludeValue) => {
    // sorry didn't have the time to write this ):

    let result = [];
    iterate(object, '', result);
    return _.remove(result, (val) => {
        return val !== excludeValue;
    });
}

exports.extractVatNumbersFromFile = (file, exclude) => {

  return new Promise((resolve, reject) => {
      let pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
      pdfParser.on("pdfParser_dataReady", pdfData => {
          // console.log(pdfParser.getAllFieldsTypes())
          resolve({vatsNumbers: extractKeyFromJson(pdfData, "VAT", exclude)});
      });

      pdfParser.loadPDF(file);
  });
};
