let Validator = require('validatorjs');
var pincodeDirectory = require('india-pincode-lookup');

let rules = {
    pin: 'required|max:6'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            return resolve({
                data: pincodeDirectory.lookup(req.query.pin),
                status: "success",
                title: req.query.pin + " - Indian Location"
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
            resolve();
        }
    })
}
