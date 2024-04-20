const numbers = document.querySelectorAll(".buttons");
const inputScreen = document.querySelector(".inputScreen");
const buttons1 = document.querySelectorAll(".buttons1");

const operationsButtons = document.querySelectorAll(".buttons2");

let displayToScreen = [];
let wholeOperation = [];

function handleNumberClick(Array) {
  if (Array !== "+/-" && Array != ".") {
    // console.log(typeof Array);
    displayToScreen.push(Array);
  } else if (Array == ".") {
    if (!displayToScreen.includes(".")) displayToScreen.push(Array);
  } else {
    if (displayToScreen[0] != "-") displayToScreen.unshift("-");
    else displayToScreen.shift();
  }

  console.log(displayToScreen);
  displayToScreen = removeAllStartingZeros(displayToScreen);
  // if()
  //   console.log(displayToScreen);
  display(displayToScreen);
}

numbers.forEach((e) => {
  e.addEventListener("click", () => {
    // console.log(e.textContent);
    if (wholeOperation.length === 1) {
      if (e.textContent == "+/-") {
        displayToScreen.push(wholeOperation[0].split(""));
        displayToScreen = displayToScreen.flat();
      }
      wholeOperation = [];
    }

    handleNumberClick(e.textContent);
  });
});

buttons1.forEach((e, index) => {
  e.addEventListener("click", () => {
    switch (index) {
      case 0:
        handleDeleteButton();
        break;
      case 1:
        displayToScreen = [0];
        wholeOperation = [];
        display(displayToScreen);
        break;
      case 2:
        if (displayToScreen.join("").includes(inputScreen.textContent)) {
          displayToScreen = [];
          displayToScreen[0] = Number(inputScreen.textContent) / 100;
          display(displayToScreen);
        } else if (
          wholeOperation.length === 1 &&
          wholeOperation.join("").includes(inputScreen.textContent)
        ) {
          wholeOperation = [];
          wholeOperation[0] = Number(inputScreen.textContent) / 100;
          display(wholeOperation);
        }
        break;

      default:
        break;
    }
  });
});

operationsButtons.forEach((e, index) => {
  e.addEventListener("click", () => {
    if (displayToScreen.length > 0) {
      wholeOperation.push(displayToScreen.join(""));
      console.log(wholeOperation);
    }
    if (displayToScreen.length === 0 && wholeOperation.length === 0) {
      wholeOperation.push("0");
    }
    performOperation(wholeOperation);

    containOperators(wholeOperation)
      ? (wholeOperation[wholeOperation.length - 1] = e.textContent)
      : wholeOperation.push(e.textContent);

    if (wholeOperation.lastIndexOf("=") == wholeOperation.length - 1)
      wholeOperation.pop();

    console.log(wholeOperation + "must be this");
    displayToScreen = [];
  });
});

function removeAllStartingZeros(array) {
  let zeros = 0;
  let index = array[0] == "-" ? 1 : 0;
  const NumberIsNegative = array[0] == "-";
  //   console.log(NumberIsNegative);
  const allZero = !NumberIsNegative
    ? array.every((e) => e == "0")
    : array.slice(1).every((e) => e == "0");
  //   console.log(allZero);
  const modifiedArray =
    allZero && NumberIsNegative
      ? ["-", "0"]
      : allZero && !NumberIsNegative
      ? ["0"]
      : array;
  console.log(modifiedArray);
  for (index; index < modifiedArray.length; index++) {
    //  console.log(index);
    if (modifiedArray[index] != "0" && modifiedArray[index] != ".") break;
    if (modifiedArray[index] == ".") {
      const FinalisedArray = modifiedArray.slice(index);
      NumberIsNegative
        ? FinalisedArray.unshift("-", "0")
        : FinalisedArray.unshift("0");

      console.log(FinalisedArray);

      return NumberIsNegative
        ? FinalisedArray.slice(0, 14)
        : FinalisedArray.slice(0, 13);
    }
  }

  if (index < modifiedArray.length) {
    let LastArray = modifiedArray.slice(index);
    NumberIsNegative ? LastArray.unshift("-") : LastArray;
    // console.log(index);
    console.log(LastArray + "is LastArray");
    return NumberIsNegative ? LastArray.slice(0, 14) : LastArray.slice(0, 13);
  } else {
    let LastArray = modifiedArray;
    console.log(LastArray + "is LastArray2");
    return NumberIsNegative ? LastArray.slice(0, 14) : LastArray.slice(0, 13);
  }
}

function display(ArrayToBeDisplayed) {
  inputScreen.textContent = ArrayToBeDisplayed.join("");
}

function handleDeleteButton() {
  if (displayToScreen.length === 0) return;
  if (displayToScreen.length === 2 && displayToScreen.includes("-"))
    displayToScreen.splice(0, 2);

  displayToScreen.pop();
  if (displayToScreen.length === 0) {
    displayToScreen[0] = "0";
  }

  display(displayToScreen);
}

//Operation functions
function add(a, b) {
  // Convert variables to numbers
  a = Number(a);
  b = Number(b);
  return a + b;
}

function subtract(a, b) {
  // Convert variables to numbers
  a = Number(a);
  b = Number(b);
  return a - b;
}

function multiply(a, b) {
  // Convert variables to numbers
  a = Number(a);
  b = Number(b);
  return a * b;
}

function divide(a, b) {
  // Convert variables to numbers
  a = Number(a);
  b = Number(b);

  if (b === 0) {
    return false;
  }

  return a / b;
}

function containOperators(OperationArray) {
  let Operators = ["*", "+", "-", "/"];
  for (k = 0; k < Operators.length; k++) {
    if (
      OperationArray.includes(Operators[k]) &&
      OperationArray.lastIndexOf(Operators[k]) === OperationArray.length - 1
    ) {
      console.log("have similarities");
      return true;
    }
  }
  console.log("no similarities");
  return false;
}

function performOperation(OperationArray) {
  if (OperationArray.length < 3) return;
  let result;
  if (OperationArray.includes("+")) {
    result = add(OperationArray[0], OperationArray[2]);
  }

  if (OperationArray.includes("-")) {
    result = subtract(OperationArray[0], OperationArray[2]);
  }

  if (OperationArray.includes("*")) {
    result = multiply(OperationArray[0], OperationArray[2]);
  }

  if (OperationArray.includes("/")) {
    result = divide(OperationArray[0], OperationArray[2]);
    if (!result) {
      display(["Math Error"]);
      setTimeout(() => {
        displayToScreen = [0];
        wholeOperation = [];
        display(displayToScreen);
      }, 4000);
      return;
    }
  }

  wholeOperation = [];
  wholeOperation[0] = result.toString().split("").slice(0, 13).join("");
  display(wholeOperation);
}
