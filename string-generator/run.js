let Validator = require('validatorjs');
var randomstring = require("randomstring");

let rules = {
    length: 'required|max:10000',
    charset: 'in:alphanumeric,alphabetic,numeric,hex',
    capitalization: 'in:mixedcase,lowercase,uppercase'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            var options = {
                length: req.query.length,
                charset: req.query.charset,
                readable: req.query.readable === 'true'
            }

            if(req.query.capitalization !== 'mixedcase')
                options.capitalization = req.query.capitalization;

            return resolve({
                data: randomstring.generate(options),
                status: "success",
                title: "Generate random " + req.query.charset + " string with " + req.query.capitalization
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
