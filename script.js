

document.addEventListener("DOMContentLoaded", () => {
    const numberBtns = document.querySelectorAll(".calc");
    const operatorBtns = document.querySelectorAll(".operator");
    const equalsButton = document.querySelector(".equals");
    const deleteButton = document.querySelector(".delete")
    const clearButton = document.querySelector(".clear");
    const previousOperand = document.querySelector("#previous-operand");
    const currentOperand = document.querySelector("#current-operand");
    const minusButton = document.querySelector(".minus");
    let number1 = "0";
    currentOperand.textContent = number1; //default 0 for start of calculations
    let operator = "";
    let number2 = "";
    let noOperator = true;
    let minus = false;
    const maxDigits = 6;

    window.addEventListener("keydown", handleKeyBoardInput)

    numberBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            if (noOperator) {
                num1Func(e.target.textContent);
            }
            else {
                num2Func(e.target.textContent);
            }

        })
    })

    operatorBtns.forEach((btn) => {
        btn.addEventListener("click", (e) =>  operatorFunc(e.target.textContent));
    });

    minusButton.addEventListener("click", toggleMinus);


    equalsButton.addEventListener(("click"), () => {
        if (number1 && operator && number2) {
            operate();
        }
    });


    deleteButton.addEventListener("click", deleteNumber)
    clearButton.addEventListener(("click"), clear)

    function clear() {
        number1 = "";
        number2 = "";
        operator = "";
        noOperator = true;
        minus = false;

        currentOperand.textContent = "0";
        previousOperand.textContent = "";
    }

    function num1Func(num) {
        if (number1.length >= maxDigits) return;
        if (num === "0" && number1[0].includes("0")) return;
        if (num === "." && number1 === "") {
            number1 += "0.";
            currentOperand.textContent = number1;
        }
        if (num === "." && number1.includes(".")) return;
        if (num !== "0" && number1 === "0" && num !== ".") {
            number1 = "";
        }
        number1 += num;
        currentOperand.textContent = number1;
    }


    function operatorFunc(op) {
        console.log(op)
        if (number1 === "") return;
        noOperator = false;
        operator = op;
        previousOperand.textContent = `${number1} ${operator}`;
        currentOperand.textContent = "";
    }



    function num2Func(num) {

        if (number2.length >= maxDigits) return;
        if (num === "0" && number2[0].includes("0")) return
        if (num === "." && number2 === "") {
            number2 += "0.";
            currentOperand.textContent = number2;
        }
        if (num === "." && number2.includes(".")) return;

        if (num !== "0" && number2 === "0" && num !== ".") {
            number2 = "";
        }
        number2 += num;
        currentOperand.textContent = number2;
    }

    ///equals will fire ----
    function operate() {
        let result;
        const num1 = parseFloat(number1);
        const num2 = parseFloat(number2);
        console.log(number1);
        console.log(number2);
        switch (operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "/":
                if (num2 === 0) {
                    currentOperand.textContent = "Error";
                    previousOperand.textContent = `${number1} ${operator} ${number2}`;
                    setTimeout(() => {
                        clear()
                    }, 1000)
                    return;
                }
                result = num1 / num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            default:
                return;
        }

        let resultString = result.toString();
        if (resultString.includes('.') && resultString.split('.')[1].length > 2) {
            result = result.toFixed(2);
        };

        currentOperand.textContent = result;
        previousOperand.textContent = `${number1} ${operator} ${number2} = `;
        number1 = result.toString();
        operator = "";
        number2 = "";
        noOperator = true;
    };
    function toggleMinus() {
        minus = !minus;
        if(noOperator){
            if(number1 === "0"){
                number1 = minus ? "-0" : "0";
            }
            else{
                number1 = minus ? `-${number1}` : number1.replace("-", "");
            }
            currentOperand.textContent = number1;
        }
        else{
            if(number2 === "0"){
                number2 = minus ? "-0" : "0";
            }
            else{
                number2 = minus ? `-${number2}` : number2.replace("-", "");
            }
            currentOperand.textContent = number2;
        }
    }
    function deleteNumber() {
        if (noOperator) {
            number1 = number1.slice(0, -1) || "0";
            currentOperand.textContent = number1 || "0";
        } else {
            number2 = number2.slice(0, -1) || "";
            currentOperand.textContent = number2 || "";
        }
    }
    function handleKeyBoardInput(e) {
        if (e.key >= "0" && e.key <= "9") {
            if (noOperator) {
                num1Func(e.key);
            } else {
                num2Func(e.key);
            }
        }
    
        if (e.key === ".") {
            if (noOperator) {
                num1Func(e.key);
            } else {
                num2Func(e.key);
            }
        }
    
        if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
            operatorFunc(e.key);
        }
    
        if (e.key === "Backspace" || e.key === "Delete") {
            deleteNumber();
        }
    
        if (e.key === "Enter") {
            operate();
        }
        if(e.key === "Escape"){
            clear()
        }
        if(e.key === "#"){
            toggleMinus();
        }
 }
        


});


