const controller = require("./controller");
const config = require("../../../config/config")

let store1, cache
if (config.remoteDB) {
	store1 = require("../../../store/remote-mySql");
    cache = require("../../../store/remote-cache")
} 
else {
    store1 = require("../../../store/my-sql")
    cache = require("../../../store/redis")
}
module.exports = controller(store1, cache);
