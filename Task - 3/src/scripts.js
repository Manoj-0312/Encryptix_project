const display = document.getElementById("display");
const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const op = ["+", "-", "*", "/"];
const open_brac = ["(", "{", "["];
const close_brac = [")", "}", "]"];
let isDotPresent = false;

function appendToDisplay(input) {
    const lastChar = display.value.slice(-1);

    if (num.includes(input) || open_brac.includes(input)) {
        display.value += input;
        if (open_brac.includes(input)) {
            isDotPresent = false;
        }
    } 
    else if (input === '.' && !isDotPresent) {
        display.value += input;
        isDotPresent = true;
    } 
    else if (op.includes(input) && !op.includes(lastChar) && lastChar !== '' && !open_brac.includes(lastChar)) {
        display.value += input;
        isDotPresent = false;
    } 
    else if (close_brac.includes(input) && open_brac.some(brac => display.value.split(brac).length > display.value.split(close_brac[open_brac.indexOf(brac)]).length)) {
        display.value += input;
    }
}

function clearScreen() {
    display.value = "";
    isDotPresent = false;
}

function calculate() {
    try {
        const validChars = [...num, ...op, ...open_brac, ...close_brac, '.', '%'];
        if (![...display.value].every(char => validChars.includes(char)) || op.some(o => display.value.includes(o.repeat(2))) || display.value.includes('..')) {
            throw new Error("Invalid Expression");
        }
        display.value = eval(display.value);
        isDotPresent = display.value.includes('.'); 
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
    else if (num.includes(key) || op.includes(key) || open_brac.includes(key) || close_brac.includes(key) || key === '.') {
        appendToDisplay(key);
    } 
    else if (key === 'Enter') {
        calculate(); 
    } 
    else if (key === 'Escape') {
        clearScreen();
        
    } 
    else if (key === 'Backspace') {
        if (display.value.slice(-1) === '.') {
            isDotPresent = false;
        }
        display.value = display.value.slice(0, -1);
    }
});
