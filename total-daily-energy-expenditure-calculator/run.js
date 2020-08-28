let Validator = require('validatorjs');
const calculate = require('fitness-health-calculations');

let rules = {
    age: 'required|max:100',
    height: 'required',
    weight: 'required',
    gender: 'in:Male,Female',
    activity: 'in:sedentary,light,moderate,high,extreme'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            req.query.height = parseInt(req.query.height);
            req.query.age = parseInt(req.query.age);
            req.query.weight = parseInt(req.query.weight);
            req.query.gender = req.query.gender.toLowerCase();
            return resolve({
                data: calculate.tdee(req.query.gender, req.query.age, req.query.height, req.query.weight, req.query.activity),
                status: "success",
                title: "Daily Calories calculation for " + req.query.age + " age"
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
