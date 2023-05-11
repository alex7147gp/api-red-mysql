if (process.env.NODE_ENV === undefined) {
    require("dotenv").config();
}
  
const URI = encodeURI(process.env.MONGODB_URI);
  
const URI2 = encodeURI(process.env.REDIS_URI)

const config = {
  remoteDB: process.env.REMOTE_DB || false,
  mongoDbUri: URI,
  redisDbUri: URI2,
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
  mySqlServiceHost: process.env.MYSQL_SERVICE_HOST || "localhost",
  mySqlServicePort: process.env.MYSQL_SERVICE_PORT || 3001,
  postPort: process.env.PORT_POST || 3002,
  cacheServiceHost: process.env.CACHE_SERVICE_HOST || "localhost",
  cacheServicePort: process.env.CACHE_SERVICE_PORT || 3003,
  redisPassword: process.env.REDIS_PASSWORD,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT
};
  
module.exports = config;
  