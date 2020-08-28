var selfsigned = require('selfsigned');

module.exports.run = (req) => {
    if(!req.query.days)
        req.query.days = 30;

    if(!req.query.algorithm)
        req.query.algorithm = 'sha1';

    if(!req.query.key_size)
        req.query.key_size = 2048;
    
    req.query.key_size = parseInt(req.query.key_size);
    if(req.query.key_size > 2048)
        req.query.key_size = 2048
    
    if(!req.query.pkcs7)
        req.query.pkcs7 = true;
    
    if(!req.query.client_certificate)
        req.query.client_certificate = true;
    
    if(!req.query.client_certificate_cn)
        req.query.client_certificate_cn = 'free-tools.io';

    return new Promise((resolve, reject) => {
        var attrs = [{ name: 'commonName', value: 'contoso.com' }];
        var pems = {
            keySize: parseInt(req.query.key_size) , // the size for the private key in bits (default: 1024)
            days: req.query.days, // how long till expiry of the signed certificate (default: 365)
            algorithm: req.query.algorithm, // sign the certificate with specified algorithm (default: 'sha1')
            extensions: [{ name: 'basicConstraints', cA: true }], // certificate extensions array
            pkcs7: req.query.pkcs7, // include PKCS#7 as part of the output (default: false)
            clientCertificate: req.query.client_certificate, // generate client cert signed by the original key (default: false)
            clientCertificateCN: req.query.client_certificate_cn // client certificate's common name (default: 'John Doe jdoe123')
        };

        var pems = selfsigned.generate(null, pems);
        return resolve({
            data: pems,
            status: 'success',
            title: 'Generate SSL Certificate for ' + req.query.days + " days"
        });
    })
}
