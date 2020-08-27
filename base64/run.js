
module.exports.run = (query) => {
    if(!query.string)
        return;
        
    if(query.string.length > 10000)
        return "Invalid String or length is greater than 10000"

    if(query.action === 'encode') {
        let buff = new Buffer(query.string);
        return buff.toString('base64');
    } else if(query.action === 'decode') {
        let buff = new Buffer(query.string, 'base64');
        return buff.toString('ascii');
    } else
        return;
}
