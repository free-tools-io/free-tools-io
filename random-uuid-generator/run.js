let Validator = require('validatorjs');
let uuid = require('uuid');

let rules = {
    version: 'required|in:v1,v4,NIL',
    number: 'between:1,500'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        if(req.query.number)
            req.query.number = parseInt(req.query.number);

        let validation = new Validator(req.query, rules);
        console.log("VALIDATION", validation.passes(), req.query);
        
        if(validation.passes()) {
            if(req.query.version !== 'NIL') {
                var uuids = [];
                for(var i = 0; i<req.query.number; i++) {
                    uuids.push(uuid[req.query.version]());
                }
                return resolve({
                    data: uuids,
                    status: "success",
                    title: "Random UUID generated " + req.query.number + " with " + req.query.version
                });
            } else {
                var uuids = [];
                for(var i = 0; i<req.query.number; i++) {
                    uuids.push(uuid.NIL);
                }
                return resolve({
                    data: uuids,
                    status: "success",
                    title: "Random UUID generated " + req.query.number + " with " + req.query.version
                });
            }
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
