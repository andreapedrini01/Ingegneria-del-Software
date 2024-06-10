const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  masterKey: process.env.SUPER_SECRET,
  configPort: process.env.PORT,
  bcrypt_salt: process.env.BCRYPT_SALT,
  dburl: process.env.DB_URL,
  client_url: process.env.CLIENT_URL,
  frontend: process.env.FRONTEND,
  serverEmail: process.env.SERVER_EMAIL,
  serverEmailPassword: process.env.SERVER_EMAIL_PASSWORD,
  emailHost: process.env.EMAIL_HOST,
  fromEmail: process.env.FROM_EMAIL,
};