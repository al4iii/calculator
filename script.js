let numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operator'),
    decimalBtn = document.getElementById('decimal'),
    clearBtns = document.querySelectorAll('.clear-btn'),    
    resultBtn = document.getElementById('result'),
    piBtn = document.getElementById('pi'),
    display =document.getElementById('display'),
    MemoryCurrentNumber = 0, // какой номер сейчас введен на табло, по умолчанию 0
    MemoryNewNumber = false, // ввели мы новое значение?
    MemoryPendingOperation= '';    // операция в ожидании
    
for(let i=0; i<numbers.length; i++){
  let number = numbers[i];
  number.addEventListener('click', function(e){ //обработчик событий
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
      if (MemoryPendingOperation === "+") {
        MemoryCurrentNumber += +localOperationMemory;  
      } else if (MemoryPendingOperation === "-") {
        MemoryCurrentNumber -= +localOperationMemory;  
      } else if (MemoryPendingOperation === "*") {
        MemoryCurrentNumber *= +localOperationMemory;  
      } else if (MemoryPendingOperation === "/") {
        MemoryCurrentNumber /= +localOperationMemory;  
      }else if (op === "x²") {        
        MemoryCurrentNumber = display.value;            
        MemoryCurrentNumber *= +MemoryCurrentNumber ;                     
        MemoryPendingOperation = op;
      }else if (op === "x³") {   
        MemoryCurrentNumber = display.value;            
        MemoryCurrentNumber *= +MemoryCurrentNumber * +MemoryCurrentNumber;
        MemoryPendingOperation = op;      
      }else if (op === "√") { 
        MemoryCurrentNumber = display.value;              
        MemoryCurrentNumber = Math.sqrt(localOperationMemory);
        MemoryPendingOperation = op;                     
      }else if (op === "1/x") {
        MemoryCurrentNumber = display.value;               
        MemoryCurrentNumber = 1/localOperationMemory;
        MemoryPendingOperation = op; 
      }else {
        MemoryCurrentNumber = +localOperationMemory;  
      }
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
    MemoryNewNumber = true
  }else if(id === 'c'){
    display.value = '0';
    MemoryNewNumber = true;
    MemoryCurrentNumber = 0;
    MemoryPendigOperation = '';    
  }  
  console.log(MemoryNewNumber);
};
