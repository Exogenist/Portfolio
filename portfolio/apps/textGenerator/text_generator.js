//Define the prefix and suffix to be joined together.
var prefix = ["anti", "de", "dis", "en", "em", "fore", "in", "im", "il", "ir", "inter", "mid", "mis", "non", "over", "pre", "re", "semi", "sub", "super", "trans", "un", "under"];
var suffix = ["able", "al", "ed", "en", "er", "est", "ful", "ic", "ing", "ion", "tion", "ity", "ty", "ive", "less", "ly", "ment", "ness","ous", "es"];
var generatedWordArr = [];
var oneLetterWord = ["a", "I"];
var twoLetterWord = ["to", "an", "my", "is", "of", "if", "he", "be", "go", "no", "at"];
var threeLetterWord = ["the", "and", "she", "get", "let", "but", "yes", "are", "can", "out", "new", "how", "now", "who", "use", "too", "you"];
var paragraph = [];
var paragraphArr = [];
//Deine random generator
function getRandomIntInclusive(min, max) {
  var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

/*We choose a random element in the prefix array then a random element in the suffix array
and bring them together into a \single text.
*/
function generatedWord() {
	var wordSize = getRandomIntInclusive(1, 10);
	if(wordSize === 1) {
		generatedWordArr.push(oneLetterWord[getRandomIntInclusive(0, oneLetterWord.length - 1)]);
	} else if(wordSize === 2) {
		generatedWordArr.push(twoLetterWord[getRandomIntInclusive(0, twoLetterWord.length - 1)]);
	} else if(wordSize > 2 && wordSize <= 5) {
		generatedWordArr.push(threeLetterWord[getRandomIntInclusive(0, threeLetterWord.length - 1)]);
	} else {
		var firstPart = prefix[getRandomIntInclusive(0, prefix.length - 1)];
  		var secondPart = suffix[getRandomIntInclusive(0, suffix.length - 1)];
  		var newWord = firstPart + secondPart;
  		generatedWordArr.push(newWord);
	}
	return generatedWordArr;
}

function generateSentence() {
	var sentenceSize = getRandomIntInclusive(4, 8);
	for(var i = 0; i <= sentenceSize; i++) {
   		generatedWord();
		if(generatedWordArr[generatedWordArr.length - 2] === generatedWordArr[generatedWordArr.length - 1]) {
			generatedWordArr.splice(generatedWordArr.length - 1 ,1);
		}
	}
	if(getRandomIntInclusive(0, 2) === 2) {
		var tempNum = getRandomIntInclusive(2, generatedWordArr.length - 2);
		var commaChoice = generatedWordArr[tempNum].concat(",");
		generatedWordArr.splice(tempNum, 1, commaChoice);
	}
	var sentence = generatedWordArr.join(" ") + ".";
	var sentenceUpper = sentence.replace(sentence[0], sentence[0].toUpperCase());
	generatedWordArr = [];
	paragraph.push(sentenceUpper);
	return paragraph;
}

function generateParagraph() {
	var paragraphSize = getRandomIntInclusive(20, 30);
	for(var j = 0; j <= paragraphSize; j++) {
		generateSentence();
	}
	var paragraphText = paragraph.join(" ");
	paragraphArr.push(paragraphText);
	paragraph = []; //Inspect
	return paragraphArr;
}

function generateText() {
	var textSize = getRandomIntInclusive(3, 5);
	for(var m = 0; m <= textSize; m++) {
		generateParagraph();
	}
	var text = paragraphArr.join("\n \n");
	paragraphArr = [];
	return text;
}


console.log(generateText());
