const fs = require("fs");
             
printFrequencyWords(
    getTopNWords(
        sortWordsByFrequency(
            countWordFrequency(
                 divide(    
                    removeStopWords(
                        convertToLower(
                            removeSingleLetters(
                                removeNonAlpha(
                                    getFile(process.argv[2])
                                )
                            )   
                        )
                    )
                )
            )
        )
    )
);
                    
//reading input number
function limit(argument) {
    return parseInt(argument);;
}

//reading file
function getFile(argument) {
    return fs.readFileSync(argument, "utf8");
}

//remove non alphanumeric 
function removeNonAlpha(text) {
    return  noAlphaText = text.replace(/[\W_]+/g, ' ');;
}

function getArrayStopWord(stopWordText) {
    return stopWordText.split(',');
}

//removing single-letter words
function removeSingleLetters(text) {
    return text.replace(/\b[a-zA-Z]\b/g, ' ');
}

//function to remove stop words from text
function removeStopWords(text) {
    const stopWordPattern = getArrayStopWord(getFile("stop_words.txt")).join("|"); // join the array of stopword into a string with the word separed by | like: cat|dog|house
    const regex = new RegExp(`\\b(${stopWordPattern})\\b`, "gi");
    return text.replace(regex, " ").replace(/\s+/g, " ").trim();
}

//applying lowerCase to text 
function convertToLower(text) {
    if (typeof text === 'string') {
        return cleantextLower = text.toLowerCase();
    }
}

//transform the text in input from a string into an array
function divide(text) {
    return text.split(' ');
}

//count frequency word. For every word in text, if it is new it assign the value 0 and then add one, otherwise it assign to the current count +1
function countWordFrequency(text) {
    const count = new Map();
    text.forEach(word => {
        if (word) {
            count.set(word, (count.get(word) || 0) + 1);
        }
    });
    return count;
}

/*
ordering the array
passing a map, retrieving an array of couple [string, count]
*/
function sortWordsByFrequency(wordCountMap) {
    return [...wordCountMap.entries()].sort((a, b) => b[1] - a[1]);
}

//getting the n most significative word from the array
function getTopNWords(coupleArray) {
    return coupleArray.slice(0, limit(process.argv[3]));
}

//printing all the results finded
function printFrequencyWords(frequencyWords) {
    frequencyWords.forEach(([word, count]) => {
        console.log(`${word}  -  ${count}`);
    });
}

