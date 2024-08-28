import { postUsers } from "../services/postF.js"

const nombre = document.getElementById("nombre")
const sede = document.getElementById("sede")
const fechaSalida = document.getElementById("fechaSalida")
const fechaRegreso = document.getElementById("fechaRegreso")
const codigo = document.getElementById("codigo")
const enviar = document.getElementById("enviar")

enviar.addEventListener("click", async function () {
    // Obtener los valores de los campos
    const nombreValue = nombre.value.trim()
    const sedeValue = sede.value.trim()
    const fechaSalidaValue = fechaSalida.value.trim()
    const fechaRegresoValue = fechaRegreso.value.trim()
    const codigoValue = codigo.value.trim()

    
    if (!nombreValue || !sedeValue || !fechaSalidaValue || !fechaRegresoValue || !codigoValue) {
        alert("Todos los campos deben ser completados.")
        return 
    }

    try {
        await postUsers(nombreValue, sedeValue, fechaSalidaValue, fechaRegresoValue, codigoValue)
        alert("Datos enviados correctamente.")
    } catch (error) {
        console.error("Error al enviar los datos:", error)
        alert("Ocurrió un error al enviar los datos.")
    }
})
