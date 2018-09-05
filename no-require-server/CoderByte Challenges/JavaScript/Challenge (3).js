//reverseString
//an application to reverse a given string(apple-- > elppa);

function FirstReverse(str) {
    strArr = [];
    for (var counter = 0; counter < str.length; counter++) {
        strArr[counter] = str[counter];
    }
    strArr = strArr.reverse();
    str = "";
    for (var counterTwo = 0; counterTwo < strArr.length; counterTwo++) {
        str += strArr[counterTwo];
    }
    return str;
}
FirstReverse(readline()); 