const express = require('express');
const Product = require('../models/product.model.js');
const router = express.Router();
const {addReport , deleteReport, getReports, getReport,assignStaff,submitFix,updateReport} = require('../controllers/product.controller.js');


router.get('/' , getReports);

router.get('/:id', getReport);


router.post('/' , addReport);

router.put('/assign/:id', assignStaff);

router.delete('/:id' , deleteReport);
router.post("/fixes/submit", submitFix);
router.put('/:id', updateReport);

module.exports = router ; 