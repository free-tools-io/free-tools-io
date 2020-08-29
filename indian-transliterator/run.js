let Validator = require('validatorjs');
let Sanscript = require('@sanskrit-coders/sanscript');

let rules = {
    string: 'required|max:10000',
    from: 'in:ahom,assamese,avestan,balinese,bengali,bhaisuki,brahmi,brahmi_tamil,burmese,chakma,cham,cyrillic,devanagari,dogra,gondi_gunjala,gondi_masaram,grantha,grantha_pandya,gujarati,gurmukhi,hk,iast,itrans,itrans_dravidian,javanese,kannada,khamti_shan,kharoshti,khmer,khom_thai,khudawadi,kolkata,lao,lao_pali,lepcha,limbu,mahajani,malayalam,manipuri,marchen,modi,mon,mro,multani,newa,ol_chiki,oriya,persian_old,phags_pa,ranjana,rejang,rohingya,sanskritOCR,shan,sharada,siddham,sinhala,slp1,sora_sompeng,sundanese,syloti_nagari,tagalog,tagbanwa,tai_laing,takri,tamil,tamil_extended,tamil_superscripted,telugu,thai,tibetan,tirhuta_maithili,urdu,vattelutu,velthuis,wancho,warang_citi,wx,zanbazar_square',
    to: 'in:ahom,assamese,avestan,balinese,bengali,bhaisuki,brahmi,brahmi_tamil,burmese,chakma,cham,cyrillic,devanagari,dogra,gondi_gunjala,gondi_masaram,grantha,grantha_pandya,gujarati,gurmukhi,hk,iast,itrans,itrans_dravidian,javanese,kannada,khamti_shan,kharoshti,khmer,khom_thai,khudawadi,kolkata,lao,lao_pali,lepcha,limbu,mahajani,malayalam,manipuri,marchen,modi,mon,mro,multani,newa,ol_chiki,oriya,persian_old,phags_pa,ranjana,rejang,rohingya,sanskritOCR,shan,sharada,siddham,sinhala,slp1,sora_sompeng,sundanese,syloti_nagari,tagalog,tagbanwa,tai_laing,takri,tamil,tamil_extended,tamil_superscripted,telugu,thai,tibetan,tirhuta_maithili,urdu,vattelutu,velthuis,wancho,warang_citi,wx,zanbazar_square',
};

module.exports.run = (req) => {
    return new Promise((resolve, reject) => {
        let validation = new Validator(req.query, rules);
        
        if(validation.passes()) {
            return resolve({
                data: Sanscript.t(req.query.string, req.query.from, req.query.to),
                status: "success",
                title: "Transliterate from " + req.query.from + " to " + req.query.to
            });
        } else {
            console.log("VALIDATION ERROR", validation.errors.all());
        }
        
        resolve();
    })
}
