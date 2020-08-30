let Validator = require('validatorjs');
var CryptoJS = require("crypto-js");

let rules = {
    string: 'required|max:10000',
    pw: 'required|max:10000',
    action: 'in:Encrypt,Decrypt'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            if(req.query.action === 'Encrypt') {
                var data = CryptoJS.DES.encrypt(req.query.string, req.query.pw);
                data = data.toString()

                return resolve({
                    data: data,
                    status: "success",
                    title: "DES Encrypt for '" + req.query.string.substring(0,10) + "...'"
                });
            } else if (req.query.action === 'Decrypt') {
                var decr = CryptoJS.DES.decrypt(req.query.string, req.query.pw);
                decr = decr.toString(CryptoJS.enc.Utf8);

                return resolve({
                    data: decr,
                    status: "success",
                    title: "DE Decrypt for '" + req.query.string.substring(0,10) + "...'"
                });
            }
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
