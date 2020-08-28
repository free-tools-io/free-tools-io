let Validator = require('validatorjs');
let jwtDecode = require('jwt-decode');

let rules = {
    jwt: 'required|max:10000',
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            return resolve({
                data: jwtDecode(req.query.jwt),
                status: "success",
                title: "JWT Decode - '" + req.query.jwt.substring(0,10) + "...'"
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
