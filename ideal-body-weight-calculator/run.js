let Validator = require('validatorjs');
const calculate = require('fitness-health-calculations');

let rules = {
    height: 'required',
    gender: 'in:Male,Female',
    units: 'in:metric,imperial',
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            req.query.height = parseInt(req.query.height);
            req.query.gender = req.query.gender.toLowerCase();
            return resolve({
                data: calculate.idealBodyWeight(req.query.height, req.query.gender, req.query.units),
                status: "success",
                title: "Ideal body weight for " + req.query.gender + " with height " + req.query.height
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
