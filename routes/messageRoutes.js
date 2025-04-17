const express = require('express');
const messagedb = require('../controllers/messControllers.js');
const router = express.Router();

router.post('/session', messagedb.session);
router.post('/message', messagedb.message); 
router.post('/messages', messagedb.getMessage); 
router.post('/sessions', messagedb.getsession); 


module.exports = router;
