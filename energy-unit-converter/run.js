let converter = require('convert-units');
let Validator = require('validatorjs');

let rules = {
    value: 'required|max:10000',
    from: 'in:Wh,mWh,kWh,MWh,GWh,J,kJ',
    to: 'in:Wh,mWh,kWh,MWh,GWh,J,kJ'
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
