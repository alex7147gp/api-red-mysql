const createRemoteDB = require("./remote")
const config = require("../config/config")






module.exports = new createRemoteDB(config.mySqlServiceHost, config.mySqlServicePort)