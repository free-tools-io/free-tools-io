let Validator = require('validatorjs');
const Bitcoin = require('bitcoin-address-generator');

let rules = {};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            Bitcoin.createWalletAddress(response => {
                return resolve({
                    data: response,
                    status: "success",
                    title: "Generate BitCoin (BTC) Wallet Address"
                });
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
    })
}
