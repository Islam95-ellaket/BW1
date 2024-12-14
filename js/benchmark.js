const questions = [
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
            "Central Process Unit",
            "Computer Personal Unit",
            "Central Processor Unit",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
            "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
            "Counter Strike: Source",
            "Corrective Style Sheet",
            "Computer Style Sheet",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: [
            "Ice Cream Sandwich",
            "Jelly Bean",
            "Marshmallow",
        ],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
    },
    {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
            "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
    },
];

let score = 0; // dichiariamo e inizializziamo il punteggio
let questionIndex

//Funzione pagina welcome
function checkbox() {
    document.getElementById('proceedButton').addEventListener('click', function () {
        const warning = document.getElementById('warning');
        const click = document.getElementById('click').checked;
        if (click) {
            window.location.href = 'index2.html';
        } else {
            alert('Devi cliccare sulla checkbox per procedere!');
        }
    });
}
document.addEventListener('DOMContentLoaded', (event) => {
    checkbox();

});

//Funzione per calcolare il punteggio
const updateScore = (question, answer) => {
    const currectAnswer = question.correct_answer
    const userAnswrer = answer.getAttribute("value")

    console.log(currectAnswer, userAnswrer)

    if (currectAnswer === userAnswrer) {
        console.log("corretto")
        score = score + 1
        return
    }

    console.log("sbagliato")
    return


    /*
     for (let questionNumber = 1; questionNumber<= questions.length; questionNumber++) {
         let count = questionNumber
         if ((questions.incorrect_answers) || (timeRemaining = 0)) {
 
             questionNumber++
 
         } else {
             score++
             questionNumber++
             
         } console.log(count, score)
     }
     let results = [count, score]
     return results
     */
}

//Funzione per mescolare le risposte
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log(array)
    return array;
};

//Funzione per popolare i radio buttons
const populateView = (questions, questionIndex) => {  //funzione che fa caricare nuovo contenitore all'interno di Questions con il punteggio ottenuto ed il responso

    if (questionIndex >= questions.length) {
        const viewContainer = document.getElementById("viewContainer")
        viewContainer.style.display = "none"

        const endView = document.createElement("div")
        endView.style.display = "block"
        const endScore = document.getElementById("endScore")
        endScore.innerHTML = `<h3> Il tuo punteggio è ${score}/${questions.length}</h3>`
        const resultJudgement = document.createElement('p')

        if (score >= 6) {

            resultJudgement.textContent = 'promosso!'
            endScore.appendChild(resultJudgement)
        } else {
            resultJudgement.textContent = 'bocciato!'
            endScore.appendChild(resultJudgement)
        }

        return score
    }

    // Seleziona una domanda
    const selectedQuestion = questions[questionIndex];

    // mergedArray è un array unico con spread operator per fare la concatenazione di 2 array corret_answer e incorret_answers cioè ci restituisce un unico array con la somma della risposta corretta + risposte errate ovvero tutte le possibili risposte
    const mergedArray = [
        ...selectedQuestion.incorrect_answers,
        selectedQuestion.correct_answer
    ];
    // qui inserirei tutta lo roba del timer reset etc....

    // Combina le risposte corrette e sbagliate (spread operator) shuffleArray ora avrà mescolate le risposte giuste con le risp sbagliate

    const allAnswers = shuffleArray(mergedArray);

    // Elementi HTML qui cerchiamo e individuiamo elemento in html  in base agli id

    const questionElement = document.getElementById("question");
    const radioGroup = document.getElementById("radioGroup");
    const questionCount = document.getElementById("questionCount")

    // Popola il testo della domanda, buttiamo dentro h2
    questionElement.innerHTML = `<h2>${selectedQuestion.question}</h2>`;

    // Svuota il contenitore dei radio buttons
    radioGroup.innerHTML = "";

    // Aggiorna indice di QUESTION fino alla lunghezza massima di questions
    questionCount.innerHTML = `<p>QUESTION ${questionIndex + 1}/${questions.length}</p>`

    // Crea e aggiungi i radio buttons
    allAnswers.forEach((answer, index) => {
        const div = document.createElement("div")
        const label = document.createElement("label");
        const radio = document.createElement("input");


        // Configura il radio button
        radio.type = "radio";
        radio.name = `answer-${questionIndex}`;
        radio.value = answer;
        radio.id = `answer-${questionIndex}-${index}`;

        // Configura il label
        label.htmlFor = radio.id;
        label.textContent = answer;

        // Aggiungi il radio e il label al contenitore
        radioGroup.appendChild(div);
        div.appendChild(radio);
        div.appendChild(label);
    });

    // Aggiorna il testo della domanda e dei radio buttons e configura rallenta di 1 secondo il passaggio alla domanda successiva
    const inputs = document.querySelectorAll("input")
    inputs.forEach((input, index) => {
        input.addEventListener("click", (event) => {
            //console.log(event.currentTarget)
            updateScore(selectedQuestion, event.currentTarget)

            setTimeout(() => {
                populateView(questions, questionIndex + 1);
            }, 1000)
        })
    })

}


let currentView = 0
const init = () => {
    populateView(questions, currentView);

}


init()



