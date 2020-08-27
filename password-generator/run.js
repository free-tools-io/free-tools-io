var generatePassword = require('password-generator');

module.exports.run = (query) => {
    return new Promise((resolve, reject) => {
        if(query.length && query.length.length > 3)
        query.length = 999;

        return resolve({
            data: generatePassword(query.length ? query.length : 12),
            status: 'success',
            title: 'Generate Password with length=' + query.length
        });
    });
}
