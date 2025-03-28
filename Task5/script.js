const startBtn = document.getElementById("start");
const container = document.getElementById("container");
let ArrayObject;
let CurrIndex = 0;
let mark = 0;
startBtn.addEventListener("click",()=>{
        fetch("quiz.json")
        .then(response => response.json())  
        .then(data => {
            ArrayObject = data;
            console.log(ArrayObject); // Objects coming from external Json file
            Quiz(); 
        })
        .catch(error => console.error(error));
});
function ansCheck(){
    const selectedAnswer = document.querySelector('input[name="options"]:checked').value;
    console.log(selectedAnswer);
    if(selectedAnswer === ArrayObject[CurrIndex-1].answer){
        mark++;
    }
    console.log("mark : ",mark); // Dynamically updating mark
    Quiz();
}
function AddElement(quizObject){
    container.classList.add("content");
    container.innerHTML = `<h2>${quizObject.question}</h2>
    <ul>
        <li><input type ="radio" name = "options" value="${quizObject.options[0]}" id="option1"/><label for="option1">${quizObject.options[0]}</label></li>
        <li><input type ="radio" name = "options" value="${quizObject.options[1]}" id="option2"/><label for="option2">${quizObject.options[1]}</label></li>
        <li><input type ="radio" name = "options" value="${quizObject.options[2]}" id="option3"/><label for="option3">${quizObject.options[2]}</label></li>
        <li><input type ="radio" name = "options" value="${quizObject.options[3]}" id="option4"/><label for="option4">${quizObject.options[3]}</label></li>
    </ul>
    ${CurrIndex==ArrayObject.length-1 ? `<button onClick="ansCheck()" id="next">Submit</button>` : `<button onClick="ansCheck()" id="next">Next</button>`}`;
    // Ternary operator for the button
}
function Quiz(){
    if(CurrIndex<ArrayObject.length){
        console.log(ArrayObject[CurrIndex]); // Individual Object which contain question,options and answer
        AddElement(ArrayObject[CurrIndex]);
        CurrIndex++;
    }
    else{
        container.innerHTML = `
                <h2>Congratulations!! You completed the quiz...</h2>
                <p>Your Score is ${mark} out of ${ArrayObject.length}</p>`;
        CurrIndex = 0;
        mark = 0;
    }
}
