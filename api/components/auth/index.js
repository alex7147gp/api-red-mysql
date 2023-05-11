const controller = require("./controller");
const config = require("../../../config/config")

let store1
if (config.remoteDB) {
	store1 = require("../../../store/my-sql");
} 
else {
    store1 = require("../../../store/my-sql")
}
module.exports = controller(store1);