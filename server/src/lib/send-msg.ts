import twilio from 'twilio';

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = 'AC5073da6a1483b8d6965b68dbc864a374';
const authToken = '28e02fc8f8ad3a269fd133e09e530c24';
const client = twilio(accountSid, authToken)

const fromNumber = '+18454201734'
const num = 6
// const fromNumber = process.env.TWILIO_NUMBER


export async function sendMsg(phoneNumber: string, message: string) {
  try {
    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: phoneNumber
    })
    console.log(result);
    return result
  } catch (e) {
    console.error(e);
  }
}
// const phoneNumber = 79978736342;
// const code = randomInteger(1000, 9999);
// client.messages
//     .create({
//     body: 'Your verification code is ' + code,
//     from: '+18454201734',
//     to: '+' + phoneNumber
// })
//     .then((message) => console.log(message));