const display = document.getElementById("display");

function appendToDisplay(input) {
    const lastChar = display.value.slice(-1);

    if (/[\d]/.test(input) || input === '(') {
        display.value += input;
    } 
    else if (input === '.' && !/\.\d*$/.test(display.value)) {
        display.value += input;
    } 
    else if (/[\+\-\*\/\%]/.test(input) && !/[\+\-\*\/\%\(\)]$/.test(lastChar)) {
        display.value += input;
    } 
    else if (input === ')' && (display.value.match(/\(/g) || []).length > (display.value.match(/\)/g) || []).length) {
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
