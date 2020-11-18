const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const decimalBtn = document.getElementById('decimal');
const clearBtns = document.querySelectorAll('.clear-btn');   
const resultBtn = document.getElementById('result');
const piBtn = document.getElementById('pi');
const display = document.getElementById('display');
let memoryCurrentNumber = 0; // what number is currently entered on the scoreboard, by default 0
let memoryNewNumber = false; // have we introduced a new meaning?
let memoryPendingOperation = ''; // pending operation
    
for (let i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', function(e) { //event handler
    numberPress(e.target.textContent);
  });
};

for (let i = 0; i < operations.length; i++) {
  let operationBtn = operations[i];
  operationBtn.addEventListener('click', function(e) {    
    operation(e.target.textContent);    
  });
};

for (let i = 0; i < clearBtns.length; i++) {
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function(e) {    
    clear(e.target.id);   
  });
}; 

decimalBtn.addEventListener('click', decimal);
piBtn.addEventListener('click', pi);


function numberPress(number) {
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else {
    display.value = display.value === '0' ? number : display.value + number;
  };
};  

function operation(op) {
    let localOperationMemory = display.value;
    if (memoryNewNumber && memoryPendingOperation !== "=") {
        display.value = memoryCurrentNumber;
    } else {
      memoryNewNumber = true;
        switch (memoryPendingOperation) {
            case "+":
                memoryCurrentNumber = memoryCurrentNumber + Number(localOperationMemory);
                break;
            case "-":
                memoryCurrentNumber = memoryCurrentNumber -  Number(localOperationMemory);
                break;
            case "*":
                memoryCurrentNumber = memoryCurrentNumber * Number(localOperationMemory);
                break;
            case "/":
                memoryCurrentNumber = memoryCurrentNumber / Number(localOperationMemory);
                break;
            case "x²":
                memoryCurrentNumber = display.value;            
                memoryCurrentNumber = Number(memoryCurrentNumber) * Number(memoryCurrentNumber);         
                break;
            case "x³":
                memoryCurrentNumber = display.value;            
                memoryCurrentNumber = Number(memoryCurrentNumber) * Number(memoryCurrentNumber)* Number(memoryCurrentNumber);                
                break;
            case "√":
                memoryCurrentNumber = display.value;              
                memoryCurrentNumber = Math.sqrt(localOperationMemory);                
                break;
            case "1/x":
                memoryCurrentNumber = display.value;               
                memoryCurrentNumber = 1/localOperationMemory;                
                break;
            default:
                memoryCurrentNumber = +localOperationMemory; 
                break;
          };
    display.value = memoryCurrentNumber;
    memoryPendingOperation = op;
};
};

function decimal() {
  let localDecimalMemory = display.value;
if (memoryNewNumber) {
  localDecimalMemory = '0.';
  memoryNewNumber= false;
} else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory +='.'
    }    
  }
  display.value = localDecimalMemory;  
};

 function clear(id) {
  if (id === 'ce') {
    display.value = '0';
    memoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    memoryNewNumber = true;
    memoryCurrentNumber = 0;
    memoryPendigOperation = '';    
  }    
};
