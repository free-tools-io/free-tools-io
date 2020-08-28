var URLToolkit = require('url-toolkit');
let Validator = require('validatorjs');

let rules = {
    url: 'required|max:10000',
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            return resolve({
                data: URLToolkit.parseURL(req.query.url),
                status: "success",
                title: "Parse URL - '" + req.query.url.substring(0,15) + "...'"
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
