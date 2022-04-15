let Q1, Q2, Q3; //question-id
let aQ1, aQ2, aQ3; //choice-id

const allDiv = document.querySelectorAll(".choice-grid div"); //total number of div 
listeners();

function listeners(){  //this function add a listener to every div
    for (const div of allDiv){
        div.addEventListener("click", chk);
    }
}

const finalRes = document.querySelector("#end"); //final result
const resetButton = finalRes.querySelector("button"); //reset button
resetButton.addEventListener("click",rstQuiz);

function chk(event) {  //to select the specific div
    const item = event.currentTarget;
    item.classList.remove('ChoiceUnselected');
    item.classList.add('ChoiceSelected');
    const checkbox = item.querySelector(".checkbox").src = "images/checked.png";

    switch(item.dataset.questionId){  //to check questionId of the answer
        case "one":
            Q1 = item.dataset.questionId;
            aQ1 = item.dataset.choiceId;
            break;

        case "two":
            Q2 = item.dataset.questionId;
            aQ2 = item.dataset.choiceId;
            break;

        case "three":
            Q3 = item.dataset.questionId;
            aQ3 = item.dataset.choiceId;
            break;
    }

    forceStyle(item.dataset.questionId, item.dataset.choiceId);
}


function forceStyle(checkQstId, checkChsId){  //this function serves the purpose of changing the current answer selected
    for(const div of allDiv){
        if(div.dataset.questionId == checkQstId && div.dataset.choiceId !== checkChsId){
            div.classList.remove("ChoiceSelected");
            div.classList.add("ChoiceUnselected");
            div.querySelector(".checkbox").src="images/unchecked.png";
        }
    }
    checkquizdone();
}

function checkquizdone(){  //output a value after a check
    if(Q1 && Q2 && Q3){

        for(let div of allDiv){
            div.removeEventListener("click",chk);
        }
        
        if(aQ1===aQ2 || aQ1===aQ3){ 
            quizres(1);
        }
        else if(aQ2===aQ1 || aQ2===aQ3){ 
            quizres(2);
        }
        else if(aQ1!==aQ2 && aQ2 !== aQ3){ 
            quizres(3);
        }  
    }
}

function quizres(value){  //choose the title and contents based on the value
    finalRes.classList.remove("hidden");
    if(value === 2){
        finalRes.querySelector("h1").textContent=  RESULTS_MAP[aQ2].title;
        finalRes.querySelector("p").textContent=  RESULTS_MAP[aQ2].contents;
    }
    else{
        finalRes.querySelector("h1").textContent=  RESULTS_MAP[aQ1].title;
        finalRes.querySelector("p").textContent=  RESULTS_MAP[aQ1].contents;
    }

}

function rstQuiz(){  //to reset the quiz
    listeners();
    Q1 = undefined;
    Q2 = undefined;
    Q3 = undefined;
    for(let div of allDiv){
        div.classList.remove("ChoiceSelected");
        div.classList.remove("ChoiceUnselected");
        div.querySelector(".checkbox").src="images/unchecked.png";
        finalRes.classList.add("hidden");
    }
}