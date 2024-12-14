//Funzione pagina welcome
function checkbox() {
    document.getElementById('proceedButton').addEventListener('click', function () {
        const warning = document.getElementById('message')
        const click = document.getElementById('click').checked
        if (click) {
            window.location.href = 'benchmark.html';
        } else {
            // Mostra il messaggio di errore
            message.style.display = 'block'
        }
    });
}
document.addEventListener('DOMContentLoaded', (event) => {
    checkbox();

});
