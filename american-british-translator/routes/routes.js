'use strict';
const Translator = require('../components/translator.js');
module.exports = function(app){
  app.route('/api/translate')
    .post((req, res) => {
        const {text, locale} = req.body;
        if(locale !== "american-to-british" && locale !== "british-to-american"){
          res.json({error: "Invalid value for locale field"});
          return;
        }
        if(!locale || text === undefined){
          res.json({error: "Required field(s) missing"});
          return;
        }
        if(!text){ 
          res.json({error: "No text to translate"})
          return;
        };
       
        const translate = new Translator(text, locale);
        locale === "american-to-british" && translate.american_to_british(text);
        locale === "british-to-american" && translate.british_to_american(text);
        if(text === translate.translated){
          res.json({translation:"Everything looks good to me!", text});
        }else{
          res.json({translation:translate.translated, text});
        }
        translate.translated = "";
    });
};