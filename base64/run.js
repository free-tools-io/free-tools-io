let Validator = require('validatorjs');

let rules = {
    string: 'required|max:10000',
    action: 'in:Encode,Decode'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            if(req.query.action === 'Encode') {
                let buff = new Buffer(req.query.string);
                return resolve({
                    data: buff.toString('base64'),
                    status: "success",
                    title: "Base64 encode for '" + req.query.string.substring(0,10) + "...'"
                });
            } else if(req.query.action === 'Decode') {
                let buff = new Buffer(req.query.string, 'base64');
                return resolve({
                    data: buff.toString('ascii'),
                    status: "success",
                    title: "Base64 decode for '" + req.query.string.substring(0,10) + "...'"
                });
            }
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
