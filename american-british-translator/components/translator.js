const americanOnly = require('./american-only.js');
const britishOnly = require('./british-only.js');
const spelling = require('./american-to-british-spelling.js');
const title = require("./american-to-british-titles.js");
function capitalizeTitle(title){
	return title[0].toUpperCase() + title.slice(1);
}
function replaceAndHighlight(text, searchFor, replaceWith){
	return text.replaceAll(searchFor, `<span class="highlight">${replaceWith}</span>`);
}
function reformatTime(text, reverse) {
	const regexBritish = /\d{1,2}\.\d{2}/g.test(text);
	const regexAmerican = /\d{1,2}:\d{2}/g.test(text);
	const regexTime = /(\d{1,2})[:.](\d{2})/g;
	if(regexBritish && reverse === "reverse"){
		return replaceAndHighlight(text, regexTime, "$1:$2");
	}
	if(regexAmerican && reverse !== "reverse"){
		return replaceAndHighlight(text, regexTime, "$1.$2");
	}
	return text;
}
class Translator {
	initializeClassProperties(text){
		this.text = text.trim();
		this.workingString = this.text;
		this.translated = ""
	}
	translate(translations, reverse, title){
		Object.entries(translations).forEach(([key, value])=>{
			const searchValue = reverse === "reverse" ? value : key;
			let replaceValue = reverse === "reverse" ? key : value;
			let searchRegex = new RegExp("\\b" + searchValue + "\\b", "ig");
			if(title === "title"){
				searchRegex = new RegExp(searchValue, "ig");
				replaceValue = capitalizeTitle(replaceValue);
			}
			this.workingString = replaceAndHighlight(this.workingString, searchRegex, replaceValue);
		})
		return this;
	}
	american_to_british(text=""){
		this.initializeClassProperties(text);
		this.translate(americanOnly);
		this.translate(spelling);
		this.translate(title, null, "title");
		this.translated = reformatTime(this.workingString);
		return this;
	}
	british_to_american(text=""){
		this.initializeClassProperties(text);
		this.translate(britishOnly);
		this.translate(spelling, "reverse");
		this.translate(title, "reverse", "title");
		this.translated = reformatTime(this.workingString, "reverse");
		return this;
	}
}

module.exports = Translator;

/*
Things you should remember about this project

indexOf <- only takes strings no regexp apparently

replaceAll <- practically using the capture groups with $1 and $2
*/
