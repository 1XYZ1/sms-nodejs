// IMPORTS
const { sendMessage } = require('../twilio/send-sms')
const SMS = require('../models/sms');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { getSocket } = require('../sockets');

// FUNCTIONS
const indexController = async(req, res) => {
    // lean() convertir objeto mongo a objeto js
    const messages = await SMS.find().sort('-createdAt').lean();
    // messages.forEach(m => console.log(m))
    res.render('index', { messages });
}
const postMessage = async(req, res) => {
    const { message, phone } = req.body;
    if (!message || !phone) return res.json('Missing message  or phone');
    const result = await sendMessage(req.body.message, req.body.phone);
    console.log(result.sid);
    await SMS.create({ Body: req.body.message, To: req.body.phone });
    res.redirect('/');
}

const receiveMessage = async(req, res) => {
    console.log(req.body);

    const savedSMS = await SMS.create({
        Body: req.body.Body,
        From: req.body.From
    })

    getSocket().emit('new message', savedSMS)

    const twiml = new MessagingResponse();
    // Enviar mensaje confirmacion de entrega
    // twiml.message('This is my response')
    res.send(twiml.toString());
}

// EXPORTS

module.exports = {
    indexController,
    postMessage,
    receiveMessage
}