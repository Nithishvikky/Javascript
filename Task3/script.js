
var Modal = document.getElementById("modal");
var modalImage = document.getElementById("modal-img");
let imgNum= 0;

function openModal(n){
     Modal.style.visibility = "visible";
     Modal.style.opacity = 1;
     modalImage.src = `assets/${n}.jpg`;  //  "imgElement.previousElementSibling.src"
     imgNum = n;
}
function closeModal(){
    Modal.style.opacity = 0;
    setTimeout(()=>{
        Modal.style.visibility= "hidden";
    },300);
}
function next(){
    imgNum++;
    if(imgNum==5){
        imgNum=1;
    }
    modalImage.src = `assets/${imgNum}.jpg`;
}
function prev(){
    imgNum--;
    if(imgNum==0){
        imgNum=4;
    }
    modalImage.src = `assets/${imgNum}.jpg`;
}

//When I click open button from image card
console.log(document.querySelectorAll(".open")); // This method select all the elements which have .open classname

let openButtons = document.querySelectorAll(".open");

openButtons.forEach((button,index)=>{
    button.addEventListener("click",()=>openModal(index+1)); // index is starting from 0 so added +1
})

//When I click close button from modal
document.getElementById("close").addEventListener("click",()=>closeModal());

//When I click next button from modal
document.getElementById("next").addEventListener("click",()=>next());

//When I click prev button from modal
document.getElementById("prev").addEventListener("click",()=>prev());

