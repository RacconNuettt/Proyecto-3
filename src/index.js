import { postUsers } from "../services/post";

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    const firstName = document.getElementById("Firstname");
    const lastName = document.getElementById("Lastname");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const role = document.getElementById("select");
    const enviar = document.getElementById("enviar");

    enviar.addEventListener("click", async function () {
        const firstNameValue = firstName.value;
        const lastNameValue = lastName.value;
        const emailValue = email.value;
        const passwordValue = password.value;
        const roleValue = role.value;

        if (!firstNameValue || !lastNameValue || !emailValue || !passwordValue || !roleValue) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const data = await postUsers(firstNameValue, lastNameValue, emailValue, passwordValue, roleValue);

            
            if (data.id) {
                alert('Usuario registrado con éxito');
                window.location.href = 'http://localhost:1234/pages/login.html'
            } else {
                alert('Hubo un problema al registrar el usuario. Por favor, inténtelo de nuevo.');
                return;
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Hubo un problema al registrar el usuario. Por favor, inténtelo de nuevo.');
        }
    });
});