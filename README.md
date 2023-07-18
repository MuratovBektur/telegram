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

## Before FIRST launching into production mode
1) Delete cerbot folder (nginx/certbot) if it exists
2) Change nginx settings to work only in http1 mode in nginx/telegram-available/telegram.conf file (you can comment 5-17 line)
3) Run app with command "./restart"
4) Change the "server_name" field in nginx/telegram-available/telegram.conf to your domain names and and after the path /etc/letsencrypt/live/ to the ssl_certificate field and ssl_certificate_key field
5) Change the "init-letsencrypt.sh" file where you must change the "domains" field to your domain names and change the email field to your email
6) Run the command "./init-letsencrypt.sh" 
7) Revert old nginx settings with http 2.0 mode in nginx/telegram-available/telegram.conf file
8) Run app with command "./restart"
