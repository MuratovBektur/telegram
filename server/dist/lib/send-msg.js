import twilio from 'twilio';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;
const client = twilio(accountSid, authToken);
export async function sendMsg(phoneNumber, message) {
    try {
        const result = await client.messages.create({
            body: message,
            from: fromNumber,
            to: phoneNumber
        });
        return result;
    }
    catch (e) {
        console.error(e);
    }
}
