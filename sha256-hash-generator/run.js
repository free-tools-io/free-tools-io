let Validator = require('validatorjs');
var CryptoJS = require("crypto-js");

let rules = {
    string: 'required|max:10000'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            return resolve({
                data: CryptoJS.SHA256(req.query.string),
                status: "success",
                title: "Generate SHA256(SHA2) Hash for '" + req.query.string.substring(0,10) + "...'"
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
