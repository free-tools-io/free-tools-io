let Validator = require('validatorjs');
var randomWords = require('random-words');

let rules = {
    count: 'required|max:100'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        if(req.query.count)
            req.query.count = parseInt(req.query.count);

        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            return resolve({
                data: randomWords(req.query.count),
                status: "success",
                title: "Generate " + req.query.count + " random english words"
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
