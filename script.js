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
  e.addEventListener("click", function (event) {
    handleNumbersClickandPress(e);
  });
  // document.addEventListener("keyup", function (event) {
  //   handleNumbersClickandPress(event, e);
  // });
});

let shiftPressed = false;
document.addEventListener("keydown", function (event) {
  keyBoardhandle(event);
});

function keyBoardhandle(event) {
  const key = event.key;
  console.log(key);
  if (!isNaN(key) || key === ".") {
    numbers.forEach((number) => {
      if (key === number.textContent) {
        handleNumbersClickandPress(number);
        return;
      }
    });
    return;
  }
  let specialButtons = [];
  buttons1.forEach((e, index) => {
    specialButtons.push([e, index]);
  });
  if (key === "Backspace") {
    handleButtons(specialButtons[0][0], specialButtons[0][1]);
    specialButtons = [];
    return;
  }
  if (key === "%") {
    handleButtons(specialButtons[2][0], specialButtons[2][1]);
    return;
  }
  const Operations = ["*", "/", "-", "+", "="];
  const opera = key === "Enter" ? "=" : key;
  operationsButtons.forEach((e, index) => {
    // if (e.textContent === key)
    specialButtons.push([e, index]);
  });
  if (Operations.includes(opera)) {
    const specifiedButton = specialButtons.filter((operatorsArray) => {
      return operatorsArray[0].textContent === opera;
    });
    const flattedspecifiedButton = specifiedButton.flat();
    handleOperationsButton(flattedspecifiedButton[0]);
    return;
  }
}

function handleNumbersClickandPress(e) {
  // console.log(e.textContent);
  // e = event.target;
  // const key = event.type === "click" ? e.textContent : event.key;
  // console.log(e);
  // console.log(event.key);
  // const key =
  //   event.type === "click" || e.textContent === event.key
  //     ? e.textContent
  //     : false;
  // if (!key) return;
  // console.log(key);
  if (wholeOperation.length === 1) {
    if (e.textContent == "+/-") {
      displayToScreen.push(wholeOperation[0].split(""));
      displayToScreen = displayToScreen.flat();
    }
    wholeOperation = [];
  }

  // console.log(e.textContent);
  handleNumberClick(e.textContent);
  // handleNumberClick(key);
  operationsButtons.forEach((operand) => {
    operand.style.background = "";
  });
  e.style.backgroundColor = "white";
  e.style.color = "black";
  setTimeout(() => {
    e.style.background = "";
    e.style.color = "";
  }, 100);
}

buttons1.forEach((e, index) => {
  e.addEventListener("click", function () {
    handleButtons(e, index);
  });
  // document.addEventListener("keydown", function (event) {
  //   handleButtons(e, index, event);
  // });
});

function handleButtons(e, index) {
  switch (index) {
    case 0:
      console.log(displayToScreen);
      if (handleDeleteButton()) {
        e.style.backgroundColor = "black";
        e.style.color = "white";
        setTimeout(() => {
          e.style.background = "";
          e.style.color = "";
        }, 100);
      }

      break;
    case 1:
      displayToScreen = [0];
      wholeOperation = [];
      e.style.backgroundColor = "black";
      e.style.color = "white";
      setTimeout(() => {
        e.style.background = "";
        e.style.color = "";
      }, 100);

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
      e.style.backgroundColor = "black";
      e.style.color = "white";
      setTimeout(() => {
        e.style.background = "";
        e.style.color = "";
      }, 100);
      break;

    default:
      break;
  }
}

operationsButtons.forEach((e) => {
  e.addEventListener("click", function () {
    handleOperationsButton(e);
  });
});

function handleOperationsButton(e) {
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
  operationsButtons.forEach((operand) => {
    operand.style.background = "";
  });
  if (e.textContent != "=") e.style.background = "red";
  else {
    e.style.backgroundColor = "red";
    setTimeout(() => {
      e.style.background = "";
      e.style.color = "";
    }, 100);
  }
}

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
  console.log(modifiedArray + "is modified Array");
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
  if (displayToScreen.length === 0 || displayToScreen.lastIndexOf("0") == 0)
    return false;
  if (displayToScreen.length === 2 && displayToScreen.includes("-"))
    displayToScreen.splice(0, 2);

  displayToScreen.pop();
  if (displayToScreen.length === 0) {
    displayToScreen[0] = "0";
    // display(displayToScreen);
    // return false;
  }

  display(displayToScreen);
  return true;
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
