const auth = require('../../../auth');

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch(action) {
            case 'update':
                const owner = req.body.id;
                auth.check.own(req, owner, next);
                next();
                break;

            case 'follow':
                auth.check.loggeg(req, next);
                next();
                break;

            default:
                next();
        }
    }

    return middleware;
}