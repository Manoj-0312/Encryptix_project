const display = document.getElementById("display");
num = [0,1,2,3,4,5,6,7,8,9]
op = ["+","-","*","/"];
open_brac = ["(","{","["];
close_brac = [")","}","]"];
isDotPresent = false;


function appendToDisplay(input) {
    const lastChar = display.value.slice(-1);


    if (num.includes(input) || open_brac.includes(input)) {
        display.value += input;
    } 
    else if (input === '.' && !isDotPresent) {
        display.value += input;
        isDotPresent = true;
    } 
    else if (op.includes(lastChar) && !op.includes(input)) {
        display.value += input;
    } 
    else if (close_brac.includes(input)) {
        display.value += input;
    }
}

function clearScreen() {
    display.value = "";
}

function calculate() {
    try {
        if (/[^0-9\+\-\*\/\(\)\.\%]/.test(display.value) || /[\+\-\*\/\%]{2,}/.test(display.value) || /\.\d*\./.test(display.value)) {
            throw new Error("Invalid Expression");
        }
        display.value = eval(display.value);
    } catch (e) {
        display.value = "Error";
        setTimeout(clearScreen, 2000);
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key === '^') {
        appendToDisplay('**');
    } 
    else if (/[\d]/.test(key) || /[\+\-\*\/\(\)\.]/.test(key)) {
        appendToDisplay(key);
    } 
    else if (key === 'Enter') {
        calculate();
    } 
    else if (key === 'Escape') {
        clearScreen();
    } 
    else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    }
});
