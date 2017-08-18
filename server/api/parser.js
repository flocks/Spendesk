const pdfParserService = require('../services/pdfParser');


exports.extractVatNumbers = (req, res, next) => {
  const file = req.file ? req.file : null;

  if (!file) {
    return res.status(400).json({ err: 'No file found' });
  }
  if (file.mimetype !== 'application/pdf') {
    return res.status(400).json({ err: 'Invalid file type'});
  }


  const urlUploaded = req.file.path;
  
  return pdfParserService
    .extractVatNumbersFromFile(urlUploaded, req.body.exclude)
    .then(vatNumbers => res.json(vatNumbers))
    .catch(next);
};
