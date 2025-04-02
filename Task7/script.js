const sendBtn = document.getElementById("sendBtn");
const inputBox = document.getElementById("inputBox");
const viewArea = document.querySelector(".content");
const responses = [
    "Hello!!Can I ask a question??",
    "Are you a RCB fan❤️!?",
    "Same here buddy❤️😊!!",
    "Bye bro💛"
]
let index = 0;

function getTime(){
    let res = new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0');
    new Date().getHours()>12 ? res+=" PM" : res+=" AM";
    return res;
}

function message(val,className){
    let message = document.createElement ("div");
    message.innerHTML = `
        <p>${val}</p>
        <span>${getTime()}</span>`;
    message.classList.add("message",className);
    viewArea.appendChild(message);

    // To make the recent message visible (auto scrolled)
    viewArea.scrollTop = viewArea.scrollHeight;
}


function sendMessage(){
    if(inputBox.value){
        message(inputBox.value,"userMessage")
        inputBox.value = "";
        botMessage();
    }
}

function botMessage(){
    let cnt = document.createElement ("p");
    cnt.textContent = "typing...";
    cnt.classList.add("botType");
    viewArea.appendChild(cnt);
    setTimeout(()=>{
        cnt.remove();
        message(responses[index],"botMessage");
        index++;
    },1500);
}

sendBtn.addEventListener("click",sendMessage);
document.addEventListener("keydown",(e)=>{
    if(e.key == "Enter"){sendMessage()} 
});