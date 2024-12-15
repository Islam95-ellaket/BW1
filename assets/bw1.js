
let timer;
let timeLeft = 60; // Timer di 60 secondi 
function startQuiz() { 
if (timer) { 
clearInterval(timer); // Resetta il timer se già avviato
 } 
timeLeft = 60; document.getElementById('timer').textContent = timeLeft; timer = setInterval(countdown, 1000); // Aggiorna ogni secondo
 } 
function countdown() {
if (timeLeft > 0) { 
    timeLeft--; document.getElementById('timer').textContent = timeLeft;
 } else {
    clearInterval(timer); alert("Tempo scaduto!"); // Puoi aggiungere altre azioni qui, come terminare il quiz
 }
  }
  document.getElementById('start-btn').addEventListener('click', startQuiz);