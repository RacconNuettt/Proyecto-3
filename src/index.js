import { getUsers } from "../services/get";
import { postUsers } from "../services/post";

const firstName = document.getElementById("Firstname")
const lastName = document.getElementById("Lastname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const role = document.getElementById("select")
const enviar= document.getElementById("enviar")

enviar.addEventListener("click", async function () {
    
    const firstNameValue = firstName.value
    const lastNameValue = lastName.value
    const emailValue = email.value
    const passwordValue = password.value
    const roleValue = role.value

    postUsers(firstNameValue,lastNameValue,emailValue,passwordValue,roleValue)

})
console.log(postUsers())
