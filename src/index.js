import { postUsers } from "../services/post";

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const modalMessage = document.getElementById("modal-message");

// Mostrar el modal con un mensaje específico
function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "block";
}

// Ocultar el modal
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

document.addEventListener("DOMContentLoaded", () => {
    const firstName = document.getElementById("Firstname");
    const lastName = document.getElementById("Lastname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const role = document.getElementById("select");
    const enviar = document.getElementById("enviar");
    const vacios = document.getElementById("vacios");

    enviar.addEventListener("click", async function () {
        const firstNameValue = firstName.value;
        const lastNameValue = lastName.value;
        const emailValue = email.value;
        const passwordValue = password.value;
        const roleValue = role.value;

        if (!firstNameValue || !lastNameValue || !emailValue || !passwordValue || !roleValue) {
            vacios.textContent = "Completa todos los datos";
            vacios.style.display = 'inline';
            return;
        }

        try {
            const data = await postUsers(firstNameValue, lastNameValue, emailValue, passwordValue, roleValue);

            if (data.id) {
                
                showModal('Usuario registrado con éxito');
                setTimeout(() => {
                    hideModal();
                    window.location.href = 'http://localhost:1234/login.html';
                }, 2000);
            } else {
                
                showModal('Hubo un problema al registrar el usuario. Por favor, inténtelo de nuevo.');
                setTimeout(() => {
                    hideModal();
                }, 2000);
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            showModal('Hubo un problema al registrar el usuario. Por favor, inténtelo de nuevo.');
            setTimeout(() => {
                hideModal();
            }, 2000);
        }
    });
});
