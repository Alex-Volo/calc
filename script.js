'use strict';
const form = document.querySelector('.calculator')
let calculatorInput = document.querySelector('.calculator__input');
const button1 = document.querySelector('.calculator__1');
console.log(button1);

form.addEventListener('click', (e) => {
    const button1 = document.querySelector('.calculator__1');
    const button2 = document.querySelector('.calculator__2');
    const button3 = document.querySelector('.calculator__3');
    const button4 = document.querySelector('.calculator__4');
    const button5 = document.querySelector('.calculator__5');
    const button6 = document.querySelector('.calculator__6');
    const button7 = document.querySelector('.calculator__7');
    const button8 = document.querySelector('.calculator__8');
    const button9 = document.querySelector('.calculator__9');
    const button0 = document.querySelector('.calculator__0');



    switch (e.target) {
        case button1: calculatorInput.value += 1; break;
        case button2: calculatorInput.value += 2; break;
        case button3: calculatorInput.value += 3; break;
        case button4: calculatorInput.value += 4; break;
        case button5: calculatorInput.value += 5; break;
        case button6: calculatorInput.value += 6; break;
        case button7: calculatorInput.value += 7; break;
        case button8: calculatorInput.value += 8; break;
        case button9: calculatorInput.value += 9; break;
        case button0: calculatorInput.value += 0; break;

    }
})