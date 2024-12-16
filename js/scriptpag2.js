let score = 0;
let timeRemaining = 60;
let currentQuestionIndex = 0;
let timer;

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

// Funzione per calcolare il punteggio
const updateScore = (question, answer) => {
    // Recuperiamo la risposta corretta dalla domanda
    const correctAnswer = question.correct_answer;

    // Recupero la risposta selezionata dall'utente tramite l'attributo "value" del bottone
    const userAnswer = answer.getAttribute("value");

    // Se la risposta selezionata è corretta, incrementiamo il punteggio
    if (correctAnswer === userAnswer) {
        score += 1;
    }
};

// Funzione per mescolare le risposte in maniera casuale
const shuffleArray = (array) => {
    // Lo shuffle viene fatto usando l'algoritmo Fisher-Yates
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));  // Selezioniamo un indice casuale
        [array[i], array[j]] = [array[j], array[i]];  // Scambiamo gli elementi
    }
    return array;  // Restituiamo l'array mescolato
};

// Funzione per mostrare il risultato finale
const showResults = function () {
    // Creiamo un elemento div per visualizzare il risultato finale
    const endView = document.createElement("div");
    endView.style.display = "block";  // Affinchè sia visibile

    // Trovo l'elemento dove mostrare il punteggio finale
    const endScore = document.getElementById("footer");

    // Mostro il punteggio finale
    endScore.innerHTML = `<h3>Il tuo punteggio è ${score}/${questions.length}</h3>`;

    // Creo un elemento per il giudizio finale
    const resultJudgement = document.createElement('p');

    // Se il punteggio è maggiore o uguale a 6, l'utente è promosso
    if (score >= 6) {
        resultJudgement.textContent = 'Promosso!';
    } else {
        resultJudgement.textContent = 'Bocciato!';
    }
    endScore.appendChild(resultJudgement);  // Aggiungingo il giudizio all'elemento del punteggio

    // Nascondo la vista delle domande e il timer
    document.getElementById("viewContainer").style.display = "none";
    document.getElementById("timerDisplay").style.display = "none";
};

// Funzione per popolare la vista con la domanda corrente e le risposte
const populateView = (questions, questionIndex) => {
    // Se abbiamo finito le domande, mostriamo il risultato
    if (questionIndex >= questions.length) {
        showResults();
        return;
    }

    // Seleziono la domanda corrente
    const selectedQuestion = questions[questionIndex];

    // Unisco le risposte sbagliate con la risposta corretta e mescoliamo
    const mergedArray = [...selectedQuestion.incorrect_answers, selectedQuestion.correct_answer];
    const allAnswers = shuffleArray(mergedArray);

    // Trovo gli elementi dove mostreremo la domanda e le risposte
    const questionText = document.getElementById("question");
    const radioGroup = document.getElementById("radioGroup");
    const questionCount = document.getElementById("questionCount");

    // Mostro il testo della domanda
    questionText.innerHTML = `<h2>${selectedQuestion.question}</h2>`;
    radioGroup.innerHTML = "";  // Resettiamo le risposte precedenti
    questionCount.innerHTML = `<p>QUESTION <span class="red">${questionIndex + 1}</span>/${questions.length}</p>`;

    // Per ogni risposta, creo un bottone con il testo della risposta
    allAnswers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;  // Testo della risposta
        button.setAttribute("value", answer);  // Assegniamo il valore della risposta
        // Aggiungiamo un listener che aggiorna il punteggio e passa alla domanda successiva
        button.addEventListener("click", (event) => {
            updateScore(selectedQuestion, event.currentTarget);  // Calcoliamo il punteggio
            nextQuestion();  // Passiamo alla domanda successiva
        });
        radioGroup.appendChild(button);  // Aggiungiamo il bottone alla vista
    });

    // Ferma il timer e lo riavvia per la prossima domanda
    clearInterval(timer);
    startTimer();
};

// Funzione per avviare il timer
function startTimer() {
    timeRemaining = 60;  // Impostiamo il tempo rimanente (60 secondi)
    document.getElementById('timeText').textContent = timeRemaining;  // Mostriamo il tempo sullo schermo

    // Ogni secondo riduciamo il tempo rimanente e aggiorniamo la visualizzazione
    timer = setInterval(function () {
        timeRemaining--;  // Decrementiamo il tempo rimanente
        document.getElementById('timeText').textContent = timeRemaining;  // Mostriamo il nuovo tempo

        // Calcoliamo l'offset per aggiornare la barra del timer
        let offset = 282.6 - (timeRemaining / 60) * 282.6;
        document.querySelector("#timer circle:nth-child(2)").style.strokeDashoffset = offset;

        // Se il tempo è scaduto, passiamo automaticamente alla domanda successiva
        if (timeRemaining <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

// Funzione per passare alla domanda successiva
function nextQuestion() {
    currentQuestionIndex++;  // Incrementiamo l'indice della domanda
    if (currentQuestionIndex < questions.length) {
        // Se ci sono ancora domande, le carichiamo
        populateView(questions, currentQuestionIndex);
    } else {
        // Se non ci sono più domande, mostriamo il risultato
        showResults();
    }
}

// Funzione per inizializzare la visualizzazione delle domande
const initialize = () => {
    populateView(questions, currentQuestionIndex);  // Popoliamo la vista con la prima domanda
};

// Avvio dell'inizializzazione quando il codice viene eseguito
initialize();

