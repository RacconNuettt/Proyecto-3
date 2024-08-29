import { postUsers } from "../services/postF.js"

const nombre = document.getElementById("nombre")
const sede = document.getElementById("sede")
const fechaSalida = document.getElementById("fechaSalida")
const fechaRegreso = document.getElementById("fechaRegreso")
const codigo = document.getElementById("codigo")
const enviar = document.getElementById("enviar")
const checkbox = document.getElementById("confirmacion")
const errorMessage = document.getElementById("error-message")
const vacios = document.getElementById("vacios")

enviar.addEventListener("click", async function (event) {
    event.preventDefault() // Previene el comportamiento predeterminado del formulario si el botón está dentro de uno

    const nombreValue = nombre.value.trim()
    const sedeValue = sede.value.trim()
    const fechaSalidaValue = fechaSalida.value.trim()
    const fechaRegresoValue = fechaRegreso.value.trim()
    const codigoValue = codigo.value.trim()

    if (!nombreValue || !sedeValue || !fechaSalidaValue || !fechaRegresoValue || !codigoValue) {
        vacios.textContent = "Completa todos los datos"
        vacios.style.display = 'inline'
        return 
    }

    if (!checkbox.checked) {
        errorMessage.textContent = "Por favor, Aceptar terminos y condiciones"
        errorMessage.style.display = 'inline'
        return
    } else {
        errorMessage.style.display = 'none'
    }

    try {
        await postUsers(nombreValue, sedeValue, fechaSalidaValue, fechaRegresoValue, codigoValue)
        alert("Datos enviados correctamente.")
        nombre.value = ''
        sede.value = ''
        fechaSalida.value = ''
        fechaRegreso.value = ''
        codigo.value = ''
        checkbox.checked = false
    } catch (error) {
        console.error("Error al enviar los datos:", error)
        alert("Ocurrió un error al enviar los datos.")
    }
})
