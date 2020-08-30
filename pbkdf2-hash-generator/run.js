let Validator = require('validatorjs');
var CryptoJS = require("crypto-js");

let rules = {
    pw: 'required|max:10000',
    iterations: 'required|max:10000',
    size: 'required|in:128,256,512'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        if(req.query.iterations)
            req.query.iterations = parseInt(req.query.iterations);

        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            var salt = CryptoJS.lib.WordArray.random(128 / 8);
            return resolve({
                data: CryptoJS.PBKDF2(req.query.pw, salt, {
                    keySize: parseInt(req.query.size) / 32,
                    iterations: req.query.iterations
                }),
                status: "success",
                title: "Generate " + req.query.iterations + " iterations of PBKDF2 Hash"
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
