'use strict';
/* 1. Использовать result для гибкости и наглядности
   
   3. Разобраться с функцией равно, определить критерии ее работы
   4. Сложение 0.1 + 0.2,
   5. Точность калькулятора
   6. Обработка результатов больших значений
   7. Деление на ноль
   8. Область видимости, уменьшение шрифта */

const form = document.querySelector('.calculator');
const calculatorInput = document.querySelector('.calculator__input');
const containerFirstNumber = document.querySelector('.calculator__valueA');

form.addEventListener('click', (e) => {
    const digitKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.',];
    const funcKeys = ['+', '/', '*', '-',];
    const oneActionKeys = ['C', '%', '±', '🠐', '√', '=',];
    
    const keyPressed = e.target.textContent;

    // Если нажимаем цифры набираются либо переменная а, либо переменная б
    if (digitKeys.includes(keyPressed)) {
        if (calculator.isFirstNumber) {
            calculator.firstNumber = calculatorInput.value += keyPressed;
            calculator.renderFirstNumber();
        } else {
            calculator.secondNumber += keyPressed;
            calculatorInput.value += keyPressed;
        }
        // Если нажимаем функции, то флаг первоеЧисло меняется на false
    } else if (funcKeys.includes(keyPressed)) {
        calculatorInput.value += keyPressed;
        calculator[keyPressed]();
        calculator.isFirstNumber = false;

    } else if (oneActionKeys.includes(keyPressed)) {
        calculator[keyPressed]();
    }
})

const calculator = {
    firstNumber: 0,
    secondNumber: 0,
    result: 0,
    isFirstNumber: true,
    nextOperation: () => '',

    renderFirstNumber: function () {
        containerFirstNumber.textContent = `=${this.firstNumber}`
    },

    'C': function () {
        this.firstNumber = this.secondNumber = calculatorInput.value = '';
        this.isFirstNumber = true;
        this.renderFirstNumber();
        this.nextOperation = () => '';
    },

    '±': function () {
        this.firstNumber = calculatorInput.value = -calculatorInput.value;
        this.renderFirstNumber();
    },
    // Backspace не везде отображается значок
    '🠐': function () {
        if (this.isFirstNumber) {
            this.firstNumber = calculatorInput.value = calculatorInput.value.slice(0, -1);
            this.renderFirstNumber();
        } else {
            calculatorInput.value = calculatorInput.value.slice(0, -1);
            this.secondNumber = this.secondNumber.slice(0, -1);
        }
    },

    '%': function () {
        this.firstNumber = calculatorInput.value /= 100;
        this.renderFirstNumber();
    },

    '+': function () {
        if (this.isFirstNumber) {
            this.nextOperation = (a, b) => +a + +b;

        } else {
            this.previosEval();
            this.nextOperation = (a, b) => +a + +b;
            this.previosEval();
        }
    },

    '/': function () {
        if (this.isFirstNumber) {
            this.nextOperation = (a, b) => b ? a / b : a;

        } else {
            this.previosEval();
            this.nextOperation = (a, b) => b ? a / b : a;
            this.previosEval();
        }
    },

    '*': function () {
        if (this.isFirstNumber) {
            this.nextOperation = (a, b) => b ? a * b : a;

        } else {
            this.previosEval();
            this.nextOperation = (a, b) => b ? a * b : a;
            this.previosEval();
        }
    },

    '-': function () {
        if (this.isFirstNumber) {
            this.nextOperation = (a, b) => a - b;

        } else {
            this.previosEval();
            this.nextOperation = (a, b) => a - b;
            this.previosEval();
        }
    },

    '√': function () {
        this.firstNumber = calculatorInput.value = this.firstNumber ** 0.5;
        this.renderFirstNumber();
    },

    previosEval: function () {
        this.firstNumber = this.nextOperation(this.firstNumber, this.secondNumber);
        this.secondNumber = '';
        this.renderFirstNumber();
    },

    '=': function () {
        this.previosEval()
        calculatorInput.value = this.firstNumber;
        this.isFirstNumber = false;
    }
}
