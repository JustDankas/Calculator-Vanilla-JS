const input = document.querySelector('.calc-screen');
const calcBtns = document.querySelectorAll('.calc-btn');

const numRgx = /\d|\.|x|÷|-|\+|%/;

// First Check
const OpError1 = /[^\d\.\x\+\-\%\÷]/;
// Check if theres more than 1 operator next to each other
const OpError3 = /[x\%\.\+\-\÷]{2,}/;

const btnDic = {
    1:'clear',
    2:'%',
    3:'÷',
    4:'1',
    5:'2',
    6:'3',
    7:'+',
    8:'4',
    9:'5',
    10:'6',
    11:'-',
    12:'7',
    13:'8',
    14:'9',
    15:'x',
    16:'0',
    17:'.',
    18:'='
}

const opDic = {
    '+':addition,
    '-':subtraction,
    'x':multiplication,
    '%':modulus,
    '÷':division,
}

function addition(a,b){
    return Number(a)+Number(b);
}
function subtraction(a,b){
    return Number(a)-Number(b);
}
function multiplication(a,b){
    return Number(a)*Number(b);
}
function division(a,b){
    return Number(a)/Number(b);
}
function modulus(a,b){
    return Number(a)%Number(b);
}
function clear(){
    input.value = '';
}
function result(string){
    if(!OpError1.test(string)){
        if(!OpError3.test(string)){
            
            
            const numTable = [];
            const opTable = [];
            let s = '';
            
            
            for(let i=0;i<string.length;i++){
                
                const letter = string[i];
                
                if(/\d|\./.test(letter)){
                    s+=letter;
                }
                else{
                    numTable.push(s);
                    opTable.push(letter);
                    s='';
                }

            }

            if(/\d/.test(s)){
                numTable.push(s);
            }
            else{
                clear();
            }
            
            let i = 0;
            
            while(opTable.length>=1){
                
                let operator = '';
                let n1 = 0;
                let n2 = 0;

                if(i<opTable.length){

                    if(/x|\%|÷/.test(opTable[i])){
                        operator = opTable.splice(i,1);
                        n2 = numTable.splice(i+1,1);
                        n1 = numTable.splice(i,1);
                        numTable.splice(i,0,opDic[operator](n1,n2));
                        
                        
                   }else{
                       i++;
                   }
                }else{
                    n1 = numTable.shift();
                    n2 = numTable.shift();
                    operator = opTable.shift();
                    numTable.unshift(opDic[operator](n1,n2));
                    console.log(n1,n2,operator,numTable);
                }
                //console.log(numTable);
                
                
                //res = opDic[operator](res,n2);
                
            }
            clear();
            updateScreen(numTable[0]);
            console.log(numTable[0]);
        }else{
            clear();
            console.log('Cleared2',string);
        }
        
    }else{
        clear();
        console.log('Cleared1',string);
    }
    
    
}

calcBtns.forEach((button,index)=>button.addEventListener('click',()=>{
    //If num or operator update screen
    if(numRgx.test(btnDic[index+1])){
        updateScreen(btnDic[index+1]);
    }
    else if(btnDic[index+1] === 'clear'){
        clear();
    }
    else if(btnDic[index+1] === '='){
        result(input.value);
    }

    
}));

function updateScreen(string){
    input.value += string;
}