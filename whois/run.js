const whois = require('whois-json');

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        if(!req.query.domain || req.query.domain.length > 1000)
            resolve();
    
        whois(req.query.domain).then(data => {
            resolve({
                data: data,
                status: "success",
                title: "WHOIS for " + req.query.domain
            })
        })
    })
}
