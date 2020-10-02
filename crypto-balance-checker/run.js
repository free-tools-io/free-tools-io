let Validator = require('validatorjs');

let rules = {
    address: 'required'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            var balance = require('crypto-balances');
            balance(req.query.address, function(error, result) {
                if(result.length > 0 && result[0].status === 'success')
                    return resolve({
                        data: result[0],
                        status: "success",
                        title: "Check " + result.asset + " crypto balance"
                    });
                else
                    resolve();
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
            resolve();
        }
        
    })
}
