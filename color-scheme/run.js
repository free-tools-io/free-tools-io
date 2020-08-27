var ColorScheme = require('color-scheme');

module.exports.run = (query) => {
    if(query.hue && query.hue.length > 3)
        query.hue = 999;

    var scheme = new ColorScheme;
    var schemes = ['mono', 'contrast', 'triade', 'tetrade', 'analogic'];
    var variations = ['pastel', 'soft', 'light', 'hard', 'pale'];
    var output = {};
    schemes.forEach(xScheme => {
        var obj = {};
        variations.forEach(xVariation => {
            obj[xVariation] = scheme.from_hue(query.hue?query.hue:21)
                                    .scheme(xScheme)
                                    .variation(xVariation)
                                    .colors();
        });
        output[xScheme] = obj;
    });
    return output;
}
