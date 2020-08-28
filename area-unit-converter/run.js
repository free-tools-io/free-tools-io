let converter = require('convert-units');
let Validator = require('validatorjs');

let rules = {
    value: 'required|max:10000',
    from: 'in:mm2,cm2,m2,ha,km2,in2,ft2,ac,mi2',
    to: 'in:mm2,cm2,m2,ha,km2,in2,ft2,ac,mi2'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        if(req.query.value)
            req.query.value = parseFloat(req.query.value);

        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            return resolve({
                data: converter(req.query.value).from(req.query.from).to(req.query.to),
                status: "success",
                title: req.query.value + req.query.from + " in '" + converter().describe(req.query.to).plural
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
