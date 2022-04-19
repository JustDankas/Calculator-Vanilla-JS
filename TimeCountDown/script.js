let inputDate = "1 Jan 2023";



const updateTimer = function(){
    let chosenDate = new Date(inputDate);
let currentDate = new Date();
let diffDate = chosenDate - currentDate;

const DIV = (num,div)=> Math.floor(num / div);
let totalSeconds = diffDate/1000;
let daysLeft = DIV(totalSeconds,(3600*24));
let hoursLeft = Math.floor(totalSeconds/3600) % 24;
let minutesLeft = DIV(totalSeconds,60) % 60;
let secondsLeft = Math.floor(totalSeconds % 60);

document.querySelector("#days").innerText = daysLeft;
document.querySelector("#hours").innerText = formatTime(hoursLeft);
document.querySelector("#minutes").innerText = formatTime(minutesLeft);
document.querySelector("#seconds").innerText = formatTime(secondsLeft);




}
document.querySelector(".date-input").addEventListener("keyup",(event)=>{
    if(event.key == "Enter"){
        inputDate = document.querySelector(".date-input").value;
    }
})
const formatTime = (time) =>{
    return time < 10 ? "0"+time : time;
}
setInterval(updateTimer,1000);
