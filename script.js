'use strict';
const form = document.querySelector('.calculator')
const calculatorInput = document.querySelector('.calculator__input');

form.addEventListener('click', (e) => {
    if (calculator.isNextCalc) {
        // calculatorInput.value = '';
        // calculator.isNextCalc = false;
    }

    const digitKeys = ['1','2','3','4','5','6','7','8','9','0', '.', '%', ];
    const funcKeys = ['+', 'C', '±','🠐', '/', '*', '-', '√', '=',]
    let keyPressed = e.target.textContent;

    if (digitKeys.includes(keyPressed)) {
        if(calculator.isNextCalc) {
            calculator.b += keyPressed;
            calculatorInput.value += keyPressed;
        } else {
        calculator.a = calculatorInput.value += keyPressed;
        calculator.renderA();
        }
    } else if(funcKeys.includes(keyPressed)){
        calculatorInput.value += keyPressed;
        calculator.isNextCalc = true;
        calculator[keyPressed]();      
    }
})

const calculator = {
    containerA: document.querySelector('.calculator__valueA'),
    a: 0,
    b: 0,
    isNextCalc: false,
    nextOperation: () => '',
    renderA: function() {
        this.containerA.textContent = `=${this.a}`
    },
    '+':  function(){
            this.isNextCalc = true;
            this.nextOperation = (a,b) => +a + +b;
            this.previosEval();              
    },
    clear: function() {
        this.a = this.b = '';
        this.isNextCalc = false;
        this.renderA();
        this.nextOperation = () => '';
       },
    'C': function() {
        this.clear();
        calculatorInput.value = '';
    },
    '±': function() {
        calculatorInput.value = -calculatorInput.value;
    },
    '🠐': function() {
        calculator.a = calculatorInput.value = calculatorInput.value.slice(0, -3);
        calculator.isNextCalc = false;
        this.renderA();
    },
    '%': function(){
        calculatorInput.value /= 100;
    },
    '/': function(){
        this.isNextCalc = true;
        this.nextOperation = (a,b) => b ? a / b : a;
        this.previosEval();
    },
    '*': function(){
        this.isNextCalc = true;
        this.nextOperation = (a,b) => b ? a * b : a;
        this.previosEval();    
    },
    '-': function(){
        this.isNextCalc = true;
        this.nextOperation = (a,b) => a - b;
        this.previosEval();
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
    '√': (a) => a ** 0.5,
    previosEval: function() {
        this.a = this.nextOperation(this.a, this.b);
        this.b = '';
        this.renderA();
    },
    '=': function() {
        this.previosEval()
        calculatorInput.value = this.a;
        // this.clear();
        this.isNextCalc = true;
    } 
}
