const numbers = ["0","1","2","3","4","5","6","7","8","9","+","*","/","-","=","c"];
const buttons = document.getElementById("numbers");
var temp="";
var res = 0;
var op = "";

numbers.forEach((number)=>{
    const btn = document.createElement("button");
    if(isNaN(Number(number))){
       btn.classList.add("operators");
    }
    btn.textContent = number;
    btn.addEventListener("click",()=>place(number));
    buttons.appendChild(btn);
})

//If I use keyboard to type numbers
document.addEventListener("keydown",(e)=>{
     const btn = e.key;
     if(numbers.includes(btn)){
        place(btn);
     }
     else if(btn==="Enter"){
        place("=");
     }
})


function calculate(a,secondNumber,op){
    if(a==0){
        document.getElementById("inputbox").value=secondNumber;
        console.log("second");
        return secondNumber;
    }
    const num = secondNumber;
        switch(op){
           case '+':
            res+=num;
            break;
           case '-':
            res-=num;
            break;
           case '*':
            res*=num;
            break;
           case '/':
            res/=num;
            break;
        }
    console.log(res);
    document.getElementById("inputbox").value=res;
    return res;
}

function place(n){
    if(isNaN(Number(n))){
        if(n==="c"){
           res = 0;
           temp = "";
           document.getElementById("inputbox").value = "";
        }
        else if(n!=="="){
            if(temp){
                res = Number(temp);
            }
            op = n;
            document.getElementById("inputbox").value = op;
        }
        else{
            console.log(temp);
            calculate(res,Number(temp),op);
        }
        console.log(res);
        temp="";
    }
    else{
        //numbers
         temp+=n;
         document.getElementById("inputbox").value = temp;
    }
}