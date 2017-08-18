const express = require('express');
const router = new express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const parser = require('./api/parser');


router.route('/extract-vat-numbers')
  .post( upload.single('file'), parser.extractVatNumbers)

module.exports = router;
