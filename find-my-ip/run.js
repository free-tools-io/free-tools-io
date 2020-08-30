const requestIp = require('request-ip');

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        resolve({
            data: requestIp.getClientIp(req),
            status: "success",
            title: "Find My IP"
        });
    });
}
