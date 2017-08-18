let fs = require('fs'),
    PDFParser = require("pdf2json");

const  extractKeyFromJson = (object, key, excludeValue) => {
    // sorry didn't have the time to write this ):
    return ["223r432V", "32r32KKIO"];
}

exports.extractVatNumbersFromFile = (file, exclude) => {

  return new Promise((resolve, reject) => {
      let pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
      pdfParser.on("pdfParser_dataReady", pdfData => {
          resolve({vatsNumbers: extractKeyFromJson(pdfData, "VAT", exclude)});
      });

      pdfParser.loadPDF(file);
  });
};
