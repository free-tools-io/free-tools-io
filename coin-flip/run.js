let Validator = require('validatorjs');
var coinflip = require('coinflip');

let rules = {
    count: 'required|max:100'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        if(req.query.count)
            req.query.count = parseInt(req.query.count);

        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            var data = [];
            for(i = 0; i<req.query.count; i++)
                data.push(coinflip() ? 'Heads!' : 'Tails !');

            return resolve({
                data: data,
                status: "success",
                title: "Generate " + req.query.count + " random pictionary words"
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
