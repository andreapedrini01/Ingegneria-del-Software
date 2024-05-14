const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  dburl: process.env.DB_URL,
  masterKey: process.env.SUPER_SECRET,
  frontend: process.env.FRONTEND,
  port: process.env.PORT
};