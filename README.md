# telegram

To run the application in a specific mode (local, dev, prod), run the corresponding file (restart-local, restart-dev, restart)

Before running in a certain mode, create a file (local.env, dev.env, .env) with variable environments in the server/configs directive, where there must be fields:
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=your_twilio_auth_token

Before running in production, change the "server_name" in nginx/telegram-available to your domain name and also change the "init-letsencrypt.sh" file, where you must change the "domains" field to your domains and change the email field to your email