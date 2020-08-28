let Validator = require('validatorjs');
let uuid = require('uuid');

let rules = {
    uuid: 'required|max:100',
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            if(uuid.validate(req.query.uuid))
                return resolve({
                    data: "It is an v" + uuid.version(req.query.uuid) + " UUID",
                    status: "success",
                    title: "Validated UUID " + req.query.uuid
                });
            else
                return resolve({
                    data: "Invalid UUID",
                    status: "success",
                    title: "Validated UUID " + req.query.uuid
                });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
