'use strict';
/*    
   6. Обработка результатов больших значений
   6.1. Максимальное количество цифр 16 +
   6.2. Обработка результата. Если он превышает длинну в 16
   символов, то представить число в экспоненциальной форме +

   8. Область видимости, уменьшение шрифта */

const form = document.querySelector('.calculator');
const calculatorInput = document.querySelector('.calculator__input');
const containerFirstNumber = document.querySelector('.calculator__valueA');

form.addEventListener('click', (e) => {
    const digitKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.',];
    const funcKeys = ['+', '/', '*', '-',];
    const oneActionKeys = ['C', '%', '±', '🠐', '√', '=',];

    const keyPressed = e.target.textContent;

    // Цифровой блок

    if (digitKeys.includes(keyPressed)) {
        switch (true) {

            case (calculator.isAfterEqual): {
                if (calculator.firstNumber.length < 17) {
                    calculator.firstNumber = calculator.secondNumber = calculatorInput.value = '';
                    calculator.isFirstNumber = true;
                    calculator.isAfterEqual = false;

                    calculator.firstNumber = calculatorInput.value += keyPressed;
                    calculator.renderFirstNumber();
                }
                break;
            }

            case (calculator.isFirstNumber): {
                if (calculator.firstNumber.length < 17) {
                    calculator.firstNumber = calculatorInput.value += keyPressed;
                    calculator.renderFirstNumber();
                }
                break;
            }

            default: {
                if (calculator.secondNumber.length < 17) {
                    calculator.secondNumber += keyPressed;
                    calculatorInput.value += keyPressed;
                }
                break;
            }
        }
        // Если нажимаем функции, то флаг первоеЧисло меняется на false
    } else if (funcKeys.includes(keyPressed)) {
        if (isNaN(calculator.firstNumber)) {
            calculator.firstNumber = calculator.secondNumber = calculatorInput.value = '';
            calculator.renderFirstNumber();
        } else if (calculator.isAfterEqual) {
            calculator.isFirstNumber = true;
            calculatorInput.value += keyPressed;
            calculator[keyPressed]();
            calculator.isFirstNumber = false;
            calculator.isAfterEqual = false;
        } else {
            calculatorInput.value += keyPressed;
            calculator[keyPressed]();
            calculator.isFirstNumber = false;
            calculator.isAfterEqual = false;
        }

    } else if (oneActionKeys.includes(keyPressed)) {
        calculator[keyPressed]();
    }
})

const calculator = {
    firstNumber: '',
    secondNumber: '',
    result: 0,
    isFirstNumber: true,
    isAfterEqual: false,
    nextOperation: () => '',

    renderFirstNumber: function () {
        containerFirstNumber.textContent = `=${this.firstNumber}`
    },

    fixResult: function (result) {
        if (isNaN(result)) {
            return result;
        } else {
            const fixedResult = parseFloat(result.toFixed(8));
            if (fixedResult.toString().length < 17) {
                return fixedResult
            } else {
                return fixedResult.toExponential(10);
            }
        }
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

        }
    },

    '/': function () {
        if (this.isFirstNumber) {
            this.nextOperation = (a, b) => {
                if (b == 0) {
                    return 'Нельзя делить на ноль'

                } else {
                    return a / b;
                }
            };

        } else {
            this.previosEval();
            this.nextOperation = (a, b) => {
                if (b == 0) {
                    return 'Нельзя делить на ноль'

                } else {
                    return a / b;
                }
            }

        }
    },

    '*': function () {
        if (this.isFirstNumber) {
            this.nextOperation = (a, b) => b ? a * b : a;

        } else {
            this.previosEval();
            this.nextOperation = (a, b) => b ? a * b : a;

        }
    },

    '-': function () {
        if (this.isFirstNumber) {
            this.nextOperation = (a, b) => a - b;

        } else {
            this.previosEval();
            this.nextOperation = (a, b) => a - b;

        }
    },

    '√': function () {
        this.firstNumber = calculatorInput.value = this.firstNumber ** 0.5;
        this.renderFirstNumber();
    },

    previosEval: function () {
        this.result = this.nextOperation(this.firstNumber, this.secondNumber);
        this.firstNumber = this.fixResult(this.result);
        this.secondNumber = '';
        this.renderFirstNumber();
    },

    '=': function () {
        this.previosEval()
        calculatorInput.value = this.firstNumber;
        this.isAfterEqual = true;
    }
}
