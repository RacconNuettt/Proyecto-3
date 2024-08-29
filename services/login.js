import { getUsers } from "../services/getLog.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const role = document.getElementById("select")
const loginForm = document.getElementById("loginForm");
const enviar = document.getElementById("enviar")

enviar.addEventListener("click", async function () {
    debugger
    const userEmail = email.value
    const userPassword = password.value
    const userRole = role.value

    if (!userEmail || !userPassword) {
        alert("Por favor, ingresa tu email y contraseña.");   
        return;
    }

    try {
        
        const users = await getUsers();
        const user = users.find(user => user.email === userEmail && user.password === userPassword && user.role === userRole);

        if (user) {
            alert("Login exitoso!")
        } else {
            alert("Email o contraseña incorrectos.");
        }
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        alert("Ocurrió un error al intentar iniciar sesión.");
    }
})

console.log(getUsers());