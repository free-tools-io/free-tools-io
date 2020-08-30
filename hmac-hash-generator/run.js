let Validator = require('validatorjs');
var CryptoJS = require("crypto-js");

let rules = {
    string: 'required|max:10000',
    pw: 'required|max:10000',
    type: 'in:HmacMD5,HmacSHA1,HmacSHA256,HmacSHA512'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            return resolve({
                data: CryptoJS[req.query.type](req.query.string, req.query.pw),
                status: "success",
                title: "Generate " + req.query.type + " Hash for '" + req.query.string.substring(0,10) + "...'"
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
