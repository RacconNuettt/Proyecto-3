import { getUsers } from "../services/getLog.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const role = document.getElementById("select");
const loginForm = document.getElementById("loginForm");
const enviar = document.getElementById("enviar");
const vacios = document.getElementById("vacios");

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalMessage = document.getElementById("modal-message");

function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "block";
}

function hideModal() {
    modal.style.display = "none";
}

span.onclick = function() {
    hideModal();
}

window.onclick = function(event) {
    if (event.target == modal) {
        hideModal();
    }
}

enviar.addEventListener("click", async function () {
    const userEmail = email.value;
    const userPassword = password.value;
    const userRole = role.value;

    if (!userEmail || !userPassword) {
        vacios.textContent = "Ingresa tu correo y contraseña.";
        vacios.style.display = 'inline'; 
        return;
    }

    try {
        const users = await getUsers();
        const user = users.find(user => user.email === userEmail && user.password === userPassword && user.role === userRole);

        if (user) {
            showModal("Login exitoso!");

            setTimeout(() => {
                hideModal();
                if (user.role === "Administrador") {
                    window.location.href = "http://localhost:1234/administrador.html";
                } else {
                    window.location.href = "http://localhost:1234/formulario.html";
                }
            }, 2000); 

        } else {
            showModal("Email o contraseña incorrectos.");

            setTimeout(() => {
                hideModal();
            }, 2000); 
        }
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        showModal("Ocurrió un error al intentar iniciar sesión.");

        setTimeout(() => {
            hideModal();
        }, 2000); 
    }
});
