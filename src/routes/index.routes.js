// IMPORTS
const { Router, json } = require('express');
const router = Router();
const { indexController, postMessage, receiveMessage } = require('../controllers/index.controller')
    // Main route
router.get('/', indexController)
    // Send message route
router.post('/send-sms', postMessage)
    // Receive message route
router.post('/receive-sms', receiveMessage)

// EXPORTS

module.exports = router;