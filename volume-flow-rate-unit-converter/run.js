let converter = require('convert-units');
let Validator = require('validatorjs');

let rules = {
    value: 'required|max:10000',
    from: 'in:mm3/s,cm3/s,ml/s,cl/s,dl/s,l/s,l/min,l/h,kl/s,kl/min,kl/h,m3/s,m3/min,m3/h,km3/s,tsp/s,Tbs/s,in3/s,in3/min,in3/h,fl-oz/s,fl-oz/min,fl-oz/h,cup/s,pnt/s,pnt/min,pnt/h,qt/s,gal/s,gal/min,gal/h,ft3/s,ft3/min,ft3/h,yd3/s,yd3/min,yd3/h',
    to: 'in:mm3/s,cm3/s,ml/s,cl/s,dl/s,l/s,l/min,l/h,kl/s,kl/min,kl/h,m3/s,m3/min,m3/h,km3/s,tsp/s,Tbs/s,in3/s,in3/min,in3/h,fl-oz/s,fl-oz/min,fl-oz/h,cup/s,pnt/s,pnt/min,pnt/h,qt/s,gal/s,gal/min,gal/h,ft3/s,ft3/min,ft3/h,yd3/s,yd3/min,yd3/h'
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
                title: req.query.value + req.query.from + " in " + converter().describe(req.query.to).plural
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
