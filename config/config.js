if (process.env.NODE_ENV === undefined) {
    require("dotenv").config();
}
  
const URI = encodeURI(process.env.MONGODB_URI);
  
const config = {
  mongoDbUri: URI,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  apiKey: process.env.API_KEY,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPass: process.env.SMTP_PASS,
  host: process.env.HOST_MYSQL,
  name: process.env.NAME_MYSQL,
  userName: process.env.USERNAME_MYSQL,
  password: process.env.PASSWORD_MYSQL,
  portMysql: process.env.PORT_MYSQL,
  mySqlServiceHost: process.env.MYSQL_SERVICE_HOST,
  mySqlServicePort: process.env.MYSQL_SERVICE_PORT,
  postPort: process.env.PORT_POST
};
  
module.exports = config;
  