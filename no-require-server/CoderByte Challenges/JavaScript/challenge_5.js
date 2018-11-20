//additionFactorial
//add all numbers up to a specific number

function SimpleAdding(num) {
    var final = 0;
    for (var counter = 1; counter <= num; counter++) {
        final += counter;
    }
    num = final;
    return num;
}
SimpleAdding(readline());