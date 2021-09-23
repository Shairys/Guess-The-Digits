let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
let keys = [];
let reverseKeys = []
let numberOfTries = 0;
digits.sort(() => Math.random() - 0.5)
for(let i = 0; i < digits.length; i++){
    keys[chars[i]] = digits[i];
    reverseKeys[digits[i]] = chars[i];
}
console.log(keys);

function stringToNumber(string){
    let mult = 1;
    let result = 0;
    for(i = string.length - 1; i >= 0; i--){
        result += keys[string[i]] * mult;
        mult *= 10;
    }
    return result;
}

function numberToString(number){
    if(number == 0)
        return reverseKeys[0];
    let result = '';
    let neg = false;
    console.log(number);
    if(number < 0){
        number = -number;
        neg = true;
    }
    console.log(number);
    while(number > 0){
        let digit = number % 10;
        number = Math.floor(number / 10);
        result += reverseKeys[digit];
    }
    result = result.split('').reverse().join('');
    if(neg)
        result = '-' + result;
    console.log(result);
    return result;
}

function writeToHistory(string){
    let history = document.getElementById('history');
    history.innerHTML += string + '<br>';
}

function validate(value){
    console.log(value.length);
    for(let i = 0; i < value.length; i++){
        console.log(value[i]);
        if(!chars.includes(value[i]))
            return false;
    }
    return true;
}

function increaseTries(){
    numberOfTries++;
    document.getElementById("numberOfTries").innerHTML = numberOfTries;
    if(numberOfTries == 10){
        writeToHistory("Tutaj byłby koniec przygody :(");
    }
}

function calculate(){
    let input = document.getElementById("calculateField").value.toUpperCase();
    let ans = '';
    let error = false;
    if(input.indexOf('+') != -1){
        let values = input.split('+');
        values[0] = values[0].replace(/\s+/g, '');
        values[1] = values[1].replace(/\s+/g, '');
        if(validate(values[0]) && validate(values[1])) {
            let currNumber = stringToNumber(values[0]) + stringToNumber(values[1]);
            ans = numberToString(currNumber);
        }
        else{
            error = true;
        }
        
    }
    else if (input.indexOf('-') != -1){
        let values = input.split('-');
        values[0] = values[0].replace(/\s+/g, '');
        values[1] = values[1].replace(/\s+/g, '');
        if(validate(values[0]) && validate(values[1])){
            let currNumber = stringToNumber(values[0]) - stringToNumber(values[1]);
            ans = numberToString(currNumber);
        }
        else{
            error = true;
        }
        console.log(error);
    }
    else{
        error = true;
    }
    if(error){
        writeToHistory(input + ' - podano nieprawidłowe działanie!');
        return;
    }
    writeToHistory(input + ' = ' + ans);
    increaseTries()
    return ans;
}


function showAnswers(){
    console.log("xD");
    let answers = document.getElementById("answers");
    answers.innerHTML = "";
    for(let i = 0; i < chars.length; i++){
        if(i > 0)
            answers.innerHTML += " ";
        answers.innerHTML += reverseKeys[i] + ":" + i;
    }
}

let calculateButton = document.getElementById("calculateButton");
calculateButton.addEventListener("click", function(){
    calculate();
});

let showAnswersButton = document.getElementById("showAnswers");
showAnswersButton.addEventListener("click", function(){
    showAnswers();
});
