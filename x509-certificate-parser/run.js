let Validator = require('validatorjs');
const x509 = require('x509');

let rules = {
    cert: 'required|max:10000'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            return resolve({
                data: x509.parseCert(req.query.cert),
                status: "success",
                title: "Parse x509 Certificate"
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
