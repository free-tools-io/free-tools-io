
module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        if(!req.query.string)
            return resolve();
            
        if(req.query.string.length > 10000)
            return resolve({
                data: "Invalid String or length is greater than 10000",
                status: "error"               
            });
    
        if(req.query.action === 'encode') {
            let buff = new Buffer(req.query.string);
            return resolve({
                data: buff.toString('base64'),
                status: "success",
                title: "Base64 encode for '" + req.query.string.substring(0,10) + "...'"
            });
        } else if(req.query.action === 'decode') {
            let buff = new Buffer(req.query.string, 'base64');
            return resolve({
                data: buff.toString('ascii'),
                status: "success",
                title: "Base64 decode for '" + req.query.string.substring(0,10) + "...'"
            });
        } else
            return resolve();
    })
}
