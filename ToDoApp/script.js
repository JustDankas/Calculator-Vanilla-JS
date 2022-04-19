const form = document.getElementById('form'); 
const input = document.getElementById('input');
const todos = document.getElementById('todos');

form.addEventListener('submit',(e)=>{

    e.preventDefault();

    addTodo();
})

function addTodo(todo){
    let todoText = input.value;
    let todoCompleted = false;
    if(todo){
        todoText = todo.text;
        todoCompleted = todo.completed;
    }
    if(todoText){
        const todoEl = document.createElement('li');
        todoEl.innerText = todoText;

        if(todoCompleted){
            todoEl.classList.add('completed');
        }
        todos.appendChild(todoEl);
        input.value = '';

        todoEl.addEventListener("click",()=>{
            todoEl.classList.toggle("completed");
            updateLS();
        })
        todoEl.addEventListener("contextmenu",(e)=>{
            e.preventDefault();
            todoEl.remove();
            updateLS();
        })
        updateLS();
    }
}

function updateLS(){
    const todosEl = document.querySelectorAll('li');

    const todo = [];

    todosEl.forEach(todoEl=>{
        todo.push({
            'text':todoEl.innerText,
            'completed':todoEl.classList.contains("completed")
        });
    });
    localStorage.setItem('todos',JSON.stringify(todo));
}



function loadLS(){
    const todosList = JSON.parse(localStorage.getItem('todos'));

    if(todosList){
    todosList.forEach(todo=>{
        addTodo(todo);
    });
    }
}

loadLS();

let cc =0;
function findKElements(arr,item){
   
   const existsTable = [];
  
    existsTable.push(exists(arr,item));
  
  return existsTable;
}
function exists(arr,item){
  cc++;
  console.log(arr,item);
  const length = arr.length;
  console.log(length);
  const pivot = arr[Math.floor(length/2)];
  console.log('pivot:',pivot);
  if(item<pivot){
      if(length > 1){
        return exists(arr.slice(0,Math.floor(length/2)),item);
      }
    }
  else if(item>pivot){
    if(length > 1){
        return exists(arr.slice(Math.floor(length/2),length),item);
      }
    }
  else if(item===pivot){
      return pivot;
    }
  return 0;
}
// const power = Math.pow(2,16);
// console.log('log',power,Math.log(power)/Math.log(Math.sqrt(32)));

// console.log(findKElements([5,7,12,20],[9]));
// console.log(cc,'hi');

function kTimes(arr,k){
    const length = arr.length;
    let i = 1;
    let s = 1;
    const kTable = [];
    while(s<length){
        cc++;
        s = Math.pow(2,i++);
        for(let j=0;j<k;j++){
            kTable[j] += findKElements(arr,s*j);
        }
        
    }
    return {counter:cc,table:kTable};
}

//console.log('counter',kTimes([5,12,16,20],5).counter,kTimes.table);

function alg1(n){
    let i = j = 0;
    while(j <=n){
        j+=i;
        i+=1;
        console.log(j,i);
    }
    return(j+" "+i);
}
function alg2(n){
    let i = j = 0;
    while(j <=n){
        j+=Math.pow(3,i);
        i+=1;
        console.log(j,i);
    }
    return(j+" "+i);
}
function sum(k){
    let sum = 0;
    for(let i=0;i<=k;i++){
        sum+= Math.pow(2,i);
    }
    return Math.log(sum)/Math.log(2);
}
console.log(alg2(5000));
console.log(Math.log(9841)/Math.log(3));
console.log('log',sum(15));
// function blabla(n){
//     let j = 1;
//     while(j<=n){
//         j = Math.pow(2,j);
//     }
//     return j;
// }
// console.log(blabla(32));