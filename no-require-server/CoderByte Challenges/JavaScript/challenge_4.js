//strManipulator
//manipulate letters in strings according to their position in alphabet and their case

function LetterChanges(str) {
    var letters = /^[A-Za-z]+$/;
    var strArr = [];
    var charCodeArr = [];
    var vowels = ["a", "e", "i", "o", "u"];
    str = str.toLowerCase();
    for (var counter = 0; counter < str.length; counter++) {
        strArr[counter] = str[counter];
        if (strArr[counter] == "z") {
            charCodeArr[counter] = 65;
        }
        else if (strArr[counter].match(letters)) {
            charCodeArr[counter] = (str.charCodeAt(counter) + 1);
        }
        else {
            charCodeArr[counter] = str.charCodeAt(counter);
        }
    }
    for (counter = 0; counter < str.length; counter++) {
        strArr[counter] = String.fromCharCode(charCodeArr[counter]);
    }
    for (counter = 0; counter < str.length; counter++) {
        str[counter] = strArr[counter]
    }
    str = "";
    for (counter = 0; counter < strArr.length; counter++) {
        str += strArr[counter]
    }
    str = "";
    for (counter = 0; counter < strArr.length; counter++) {
        if (vowels.includes(strArr[counter])) {
            str += strArr[counter].toUpperCase();
        }
        else {
            str += strArr[counter]
        }
    }
    return str;
}
LetterChanges(readline());

