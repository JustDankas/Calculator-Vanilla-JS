const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const brushSizeEl = document.getElementById('brush-size');
const colorEl = document.getElementById('color');
const clearBtn = document.getElementById('clear');

let size = 30;
let color = 'black';

let canDraw = false;

canvas.addEventListener('mousedown',(e)=>{
    canDraw=true;

    canvas.addEventListener('mousemove',(e)=>{
        if(canDraw){

            let x = e.offsetX;
            let y = e.offsetY;
        
            drawCircle(x,y);
        }
    })

})

canvas.addEventListener('mouseup',()=>{
    canDraw = false;
})

function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x,y,size,0,Math.PI*2)
    ctx.fillStyle = color;
    ctx.fill();
}

increaseBtn.addEventListener('click',()=>{
    size += 2;
    if(size>60){
        size = 60;
    }
    updateBrushSize(size);
})

decreaseBtn.addEventListener('click',()=>{
    size -= 2;
    if(size<2){
        size = 2;
    }
    updateBrushSize(size);
})

colorEl.addEventListener('change',(e)=>{
    color = e.target.value;
    console.log(e,e.target,e.target.value);
})

clearBtn.addEventListener('click',()=>{
    clearCanvas();
});

function clearCanvas(){
    ctx.fillStyle='white'; 
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
}

function updateBrushSize(size){
    brushSizeEl.innerText = size;
}

// DELETE THIS LATER
function hashIndex(element,step=0,length){
    return (element+7*(step>0?1:0)+step^2)%length
}

var intersection = function(nums1, nums2) {
    let min = Math.max(nums1.length,nums2.length);
    let hashTable = Array(min+30).fill(null);
    let returnTable = [];
    let index;
    nums1.forEach(el=>{
        if(hashTable.indexOf(el) < 0){
            let i = -1;
            do{
                i++
                index = hashIndex(el,i,hashTable.length);
            }while(hashTable[index] != null);
            hashTable[index] = el;
            
        }else{
            
        }
        
    })
    nums2.forEach(el=>{
        
            let i = -1;
            do{
                i++;
                index = hashIndex(el,i,hashTable.length);
                
                if(hashTable[index] === el){
                    returnTable.push(el);
                    break;
                }
            }while(hashTable[index]!=null)
 
    })
    return returnTable;
};

console.log(intersection([0,1,2,3,16,29,133,6,7,8,9,10,11
    ,12,13,14,15,16,17,18,19,20,21,222,223,224,225,167,133,121,122,123,124,125,126,127]
    ,[100,21,1,224,222,17]));
