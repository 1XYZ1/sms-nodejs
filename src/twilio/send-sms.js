const config = require('../config');
const client = require('twilio')(config.accountSid, config.authToken);
/**
 * 
 * @param {string} body -Text message
 * @param {string} phone -Number phone
 */
async function sendMessage(body, phone) {
    try {
        const message = await client.messages.create({
            to: phone,
            from: '+15402745447',
            body: body
        })
        console.log(message);
        return message;
    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendMessage };