//calcFactorial
//An application to calculate the factorial of a given number

function FirstFactorial(num) {
    var final = 1;
    for (var counter = 1; counter <= num; counter++){
        final *= counter;
    }
    num = final;
    return num;
}
FirstFactorial(readline());                            

