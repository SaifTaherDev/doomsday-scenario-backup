//biggestWord
//A small application to extract the largest word from a given sentence

function LongestWord(sen) {
    var lenArr = [];
    var finalResult = "";

    sen = sen.replace(/[^a-z " "]/gi, '');
    sen = sen.split(" ");

    for (var counter = 0; counter < sen.length; counter++) {
        lenArr[counter] = parseInt(sen[counter].length);
    }
    lenArr = lenArr.sort();
    for (var counterTwo = 0; counterTwo < sen.length; counterTwo++) {
        if (parseInt(sen[counterTwo].length) == Math.max(...lenArr)) {
            finalResult = sen[counterTwo];
            break;
        }
    }

    return finalResult;
}
LongestWord(readline());