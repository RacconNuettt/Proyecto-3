// script.js

// Obtener elementos del DOM
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

// Abrir el modal cuando se haga clic en el botón
btn.onclick = function() {
    modal.style.display = "block";
}

// Cerrar el modal cuando se haga clic en el elemento <span>
span.onclick = function() {
    modal.style.display = "none";
}

// Cerrar el modal si se hace clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}
