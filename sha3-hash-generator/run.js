let Validator = require('validatorjs');
var CryptoJS = require("crypto-js");

let rules = {
    string: 'required|max:10000',
    length: 'in:512,384,256,224'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            return resolve({
                data: CryptoJS.SHA3(req.query.string, { outputLength: parseInt(req.query.length) }),
                status: "success",
                title: "Generate SHA3 Hash with length " + req.query.length + " for '" + req.query.string.substring(0,10) + "...'"
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
