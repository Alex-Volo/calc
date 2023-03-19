'use strict';
const form = document.querySelector('.calculator')
const calculatorInput = document.querySelector('.calculator__input');


form.addEventListener('click', (e) => {
    if (calculator.isNextCalc) {
        calculatorInput.value = '';
        calculator.isNextCalc = false;
    }
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
    const buttonPoint = document.querySelector('.calculator__point');
    const buttonC = document.querySelector('.calculator__c');
    const buttonPlusMinus = document.querySelector('.calculator__plus-minus');
    const buttonBackspace = document.querySelector('.calculator__backspace');
    const buttonPercent = document.querySelector('.calculator__percent');
    const buttonDivide = document.querySelector('.calculator__divide');
    const buttonMult = document.querySelector('.calculator__mult');
    const buttonMinus = document.querySelector('.calculator__minus');

    const buttonSqrt = document.querySelector('.calculator__sqrt');
    const buttonPlus = document.querySelector('.calculator__plus');
    const buttonEval = document.querySelector('.calculator__eval');

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
        case buttonPoint: calculatorInput.value += '.'; break;
        case buttonC: calculator.clearAll(); break;
        case buttonPlusMinus: calculator.plusMinus(); break;
        case buttonBackspace: calculator.backspace(); break;
        case buttonPercent: calculator.percent(); break;
        case buttonDivide: calculator.divide(); break;
        case buttonMult: calculator.mult(); break;
        case buttonMinus: calculator.minus(); break;


        case buttonSqrt: calculatorInput.value = calculator.sqrt(calculatorInput.value); break;
        case buttonPlus: calculator.plus(calculatorInput.value); break;
        case buttonEval: calculator.eval(); break;



    }
})

const calculator = {
    a: 0,
    b: 0,
    isNextCalc: false,
    nextOperation: () => '',
    plus: function() {
        if (!this.a){ //Если а пустая
            this.a = calculatorInput.value;
            this.isNextCalc = true;
            this.nextOperation = (a,b) => +a + +b;
        }
        else {
            this.previosEval();
            this.nextOperation = (a,b) => +a + +b;
        }        
       
    },
    clear: function() {
        this.a = this.b = this.isNextCalc = '';
        this.nextOperation = () => '';
       },
    clearAll: function() {
        this.clear();
        calculatorInput.value = '';
    },
    plusMinus: function() {
        calculatorInput.value = -calculatorInput.value;
    },
    backspace: function() {
        calculatorInput.value = calculatorInput.value.slice(0, -1);
    },
    percent: function(){
        calculatorInput.value /= 100;
    },
    divide: function(){
        if (!this.a){ //Если а пустая
            this.a = calculatorInput.value;
            this.isNextCalc = true;
            this.nextOperation = (a,b) => a / b;
        }
        else {
            this.previosEval();
            this.nextOperation = (a,b) => a / b;
        }        
    },
    mult: function(){
        if (!this.a){ //Если а пустая
            this.a = calculatorInput.value;
            this.isNextCalc = true;
            this.nextOperation = (a,b) => a * b;
        }
        else {
            this.previosEval();
            this.nextOperation = (a,b) => a * b;
        }          
    },
    minus: function(){
        if (!this.a){ //Если а пустая
            this.a = calculatorInput.value;
            this.isNextCalc = true;
            this.nextOperation = (a,b) => a - b;
        }
        else {
            this.previosEval();
            this.nextOperation = (a,b) => a - b;
        }       
    },
    sqrt: (a) => a ** 0.5,
    previosEval: function() {
        this.b = calculatorInput.value;
        this.a = this.nextOperation(this.a, this.b);
        this.isNextCalc = true;
    },
    eval: function() {
        this.previosEval()
        calculatorInput.value = this.a;
        // this.clear();
        this.isNextCalc = true;
    }
    
}
