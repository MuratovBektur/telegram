# telegram

Before running in a certain mode, create a file (local.env, dev.env, .env) with variable environments in the server/configs directive, where there must be fields:
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=your_twilio_number

POSTGRES_DB=your_postgres_db
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password

TOKEN_SECRET=your_token_string

To run the application in a specific mode (local, dev, prod), run the corresponding command (./restart-local, ./restart-dev, ./restart)

## Before launching into production mode
1) Change the "server_name" field in nginx/telegram-available to your domains
2) Change the "init-letsencrypt.sh" file where you must change the "domains" field to your domains and change the email field to your email
3) Run the commands "./init-letsencrypt.sh" and "./restart"