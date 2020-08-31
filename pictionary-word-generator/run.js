let Validator = require('validatorjs');
var randomPictionaryWords = require('word-pictionary-list');

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
                data: randomPictionaryWords(req.query.count),
                status: "success",
                title: "Generate " + req.query.count + " random pictionary words"
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
