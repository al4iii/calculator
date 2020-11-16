let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operator');
let decimalBtn = document.getElementById('decimal');
let clearBtns = document.querySelectorAll('.clear-btn');   
let resultBtn = document.getElementById('result');
let piBtn = document.getElementById('pi');
let display =document.getElementById('display');
let MemoryCurrentNumber = 0; // what number is currently entered on the scoreboard, by default 0
let MemoryNewNumber = false; // have we introduced a new meaning?
let MemoryPendingOperation= '';    // pending operation

    
for(let i=0; i<numbers.length; i++){
  let number = numbers[i];
  number.addEventListener('click', function(e){ //event handler
    numberPress(e.target.textContent)
  });
};

for(let i=0; i<operations.length; i++){
  let operationBtn = operations[i];
  operationBtn.addEventListener('click', function(e){    
    operation(e.target.textContent);    
  });
};

for(let i=0; i<clearBtns.length; i++){
  let clearBtn = clearBtns[i];
  clearBtn.addEventListener('click', function(e){    
    clear(e.target.id);   
  });
}; 

decimalBtn.addEventListener('click', decimal);
piBtn.addEventListener('click', pi);

function numberPress(number){
  if(MemoryNewNumber){
    display.value = number;
    MemoryNewNumber = false;
  }else{
  if(display.value === '0'){
    display.value = number;
  }else{
    display.value += number;
  };
};  
};

function operation(op){
    let localOperationMemory = display.value;
    if(MemoryNewNumber && MemoryPendingOperation !== "=") {
        display.value = MemoryCurrentNumber;
    } else {
        MemoryNewNumber = true;
        switch (MemoryPendingOperation) {
            case "+":
                MemoryCurrentNumber = MemoryCurrentNumber + Number(localOperationMemory);
                break;
            case "-":
                MemoryCurrentNumber = MemoryCurrentNumber -  Number(localOperationMemory);
                break;
            case "*":
                MemoryCurrentNumber = MemoryCurrentNumber * Number(localOperationMemory);
                break;
            case "/":
                MemoryCurrentNumber = MemoryCurrentNumber / Number(localOperationMemory);
                break;
            case "x²":
                MemoryCurrentNumber = display.value;            
                MemoryCurrentNumber = Number(MemoryCurrentNumber) * Number(MemoryCurrentNumber);                     
                MemoryPendingOperation = op;
                break;
            case "x³":
                MemoryCurrentNumber = display.value;            
                MemoryCurrentNumber = Number(MemoryCurrentNumber) * Number(MemoryCurrentNumber)* Number(MemoryCurrentNumber);
                MemoryPendingOperation = op;
                break;
            case "√":
                MemoryCurrentNumber = display.value;              
                MemoryCurrentNumber = Math.sqrt(localOperationMemory);
                MemoryPendingOperation = op;
                break;
            case "1/x":
                MemoryCurrentNumber = display.value;               
                MemoryCurrentNumber = 1/localOperationMemory;
                MemoryPendingOperation = op;
                break;
            default:
                MemoryCurrentNumber = +localOperationMemory; 
                break;
          };
    display.value = MemoryCurrentNumber;
    MemoryPendingOperation = op;
};
};

function decimal(){
  let localDecimalMemory = display.value;
if(MemoryNewNumber){
  localDecimalMemory = '0.';
  MemoryNewNumber= false;
}else{
    if(localDecimalMemory.indexOf('.') === -1){
      localDecimalMemory +='.'
    }    
  }
  display.value = localDecimalMemory;  
};

function clear(id){
  if(id === 'ce'){
    display.value = '0';
    MemoryNewNumber = true;
  }else if(id === 'c'){
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendigOperation = '';    
  }    
};
 