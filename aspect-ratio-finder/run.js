let Validator = require('validatorjs');
const ratio = require('aspect-ratio')

let rules = {
    width: 'required|max:100000',
    height: 'required|max:100000'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        if(req.query.width)
            req.query.width = parseInt(req.query.width);
            
        if(req.query.height)
            req.query.height = parseInt(req.query.height);

        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            const output = ratio(req.query.width, req.query.height)
            return resolve({
                data: output,
                status: "success",
                title: "Aspect Ratio (" + output + ") for " + req.query.width + "x" + req.query.height + ""
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
