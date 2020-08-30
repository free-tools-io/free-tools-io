let Validator = require('validatorjs');
const CC = require('currency-converter-lt')

let rules = {
    value: 'required|max:1000000',
    from: 'in:AFN,ALL,DZD,AOA,ARS,AMD,AWG,AUD,AZN,BSD,BHD,BBD,BDT,BYR,BZD,BMD,BTN,XBT,BOB,BAM,BWP,BRL,BND,BGN,BIF,XPF,KHR,CAD,CVE,KYD,FCFA,CLP,CLF,CNY,CNY,COP,CF,CDF,CRC,HRK,CUC,CZK,DKK,DJF,DOP,XCD,EGP,ETB,FJD,GMD,GBP,GEL,GHS,GTQ,GYD,HTG,HNL,HKD,HUF,ISK,INR,IDR,IRR,IQD,ILS,JMD,JPY,JOD,KZT,KES,KWD,KGS,LAK,LBP,LSL,LRD,LYD,MOP,MKD,MGA,MWK,MYR,MVR,MRO,MUR,MXN,MDL,MAD,MZN,MMK,NAD,NPR,ANG,NZD,NIO,NGN,NOK,OMR,PKR,PAB,PGK,PYG,PHP,PLN,QAR,RUB,RWF,SVC,SAR,RSD,SCR,SLL,SGD,SBD,SOS,ZAR,KRW,VES,LKR,SDG,SRD,SZL,SEK,CHF,TJS,TZS,THB,TOP,TTD,TND,TRY,TMT,UGX,UAH,AED,USD,UYU,UZS,VND,XOF,YER,ZMW,ETH,EUR,LTC,TWD,PEN',
    to: 'in:AFN,ALL,DZD,AOA,ARS,AMD,AWG,AUD,AZN,BSD,BHD,BBD,BDT,BYR,BZD,BMD,BTN,XBT,BOB,BAM,BWP,BRL,BND,BGN,BIF,XPF,KHR,CAD,CVE,KYD,FCFA,CLP,CLF,CNY,CNY,COP,CF,CDF,CRC,HRK,CUC,CZK,DKK,DJF,DOP,XCD,EGP,ETB,FJD,GMD,GBP,GEL,GHS,GTQ,GYD,HTG,HNL,HKD,HUF,ISK,INR,IDR,IRR,IQD,ILS,JMD,JPY,JOD,KZT,KES,KWD,KGS,LAK,LBP,LSL,LRD,LYD,MOP,MKD,MGA,MWK,MYR,MVR,MRO,MUR,MXN,MDL,MAD,MZN,MMK,NAD,NPR,ANG,NZD,NIO,NGN,NOK,OMR,PKR,PAB,PGK,PYG,PHP,PLN,QAR,RUB,RWF,SVC,SAR,RSD,SCR,SLL,SGD,SBD,SOS,ZAR,KRW,VES,LKR,SDG,SRD,SZL,SEK,CHF,TJS,TZS,THB,TOP,TTD,TND,TRY,TMT,UGX,UAH,AED,USD,UYU,UZS,VND,XOF,YER,ZMW,ETH,EUR,LTC,TWD,PEN'
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        if(req.query.value)
            req.query.value = parseFloat(req.query.value);

        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            let currencyConverter = new CC()
            currencyConverter.from(req.query.from).to(req.query.to).amount(req.query.value).convert().then((response) => {
                return resolve({
                    data: response + " " + req.query.to,
                    status: "success",
                    title: "Value of " + req.query.value + " " + req.query.from + " in " + req.query.to
                });
            })
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
            resolve();
        }
    })
}
