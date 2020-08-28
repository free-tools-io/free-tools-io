let Validator = require('validatorjs');
const beautify = require('beautify');

let rules = {
    code: 'required|max:10000',
    format: 'required|in:JS,HTML,JSON,CSS,XML'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            return resolve({
                data: beautify(req.query.code, {format: req.query.format.toLowerCase()}),
                status: "success",
                title: "Beautify " + req.query.format
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
