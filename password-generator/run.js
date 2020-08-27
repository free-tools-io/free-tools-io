var generatePassword = require('password-generator');

module.exports.run = (query) => {
    if(query.length && query.length.length > 3)
        query.length = 999;

    return generatePassword(query.length ? query.length : 12);
}
