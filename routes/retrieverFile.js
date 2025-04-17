const express = require('express');
const retriever = require('../controllers/retrieverFilecontrollers.js');
const router = express.Router();

router.post('/', retriever.retrieverDoc);  // POST /folders
module.exports = router;