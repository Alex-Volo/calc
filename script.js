'use strict';
// Поддерживает несколько операций подряд
// Но пока не умеет выполнять операции по 
// математическом приоритету
// Почему-то не рендерятся операции % и √

const form = document.querySelector('.calculator');
const calculatorInput = document.querySelector('.calculator__input');

form.addEventListener('click', (e) => {
    if (!calculator.isFirstNumber) {
        // calculatorInput.value = '';
        // calculator.isFirstNumber = true;
    }

    const digitKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.',];
    const funcKeys = ['+', '/', '*', '-',];
    const oneActionKeys = ['C', '%', '±', '🠐', '√', '=',]
    let keyPressed = e.target.textContent;

    // Если нажимаем цифры набираются либо переменная а, либо переменная б
    if (digitKeys.includes(keyPressed)) {
        if (calculator.isFirstNumber) {
            calculator.a = calculatorInput.value += keyPressed;
            calculator.renderA();
        } else {
            calculator.b += keyPressed;
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
    containerA: document.querySelector('.calculator__valueA'),
    a: 0,
    b: 0,
    isFirstNumber: true,
    nextOperation: () => '',

    renderA: function () {
        this.containerA.textContent = `=${this.a}`
    },

    'C': function () {
        this.a = this.b = calculatorInput.value = '';
        this.isFirstNumber = true;
        this.renderA();
        this.nextOperation = () => '';
    },

    '±': function () {
        this.a = calculatorInput.value = -calculatorInput.value;
        this.renderA();
    },
    // Backspace не везде отображается значок
    '🠐': function () {
        if (this.isFirstNumber) {
            this.a = calculatorInput.value = calculatorInput.value.slice(0, -1);
            this.renderA();
        } else {
            calculatorInput.value = calculatorInput.value.slice(0, -1);
            this.b = this.b.slice(0, -1);
        }
    },

    '%': function () {
        this.a = calculatorInput.value /= 100;
        renderA();
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
        this.a = calculatorInput.value = this.a ** 0.5;
        renderA();
    },

    previosEval: function () {
        this.a = this.nextOperation(this.a, this.b);
        this.b = '';
        this.renderA();
    },

    '=': function () {
        this.previosEval()
        calculatorInput.value = this.a;
        this.isFirstNumber = false;
    }
}
