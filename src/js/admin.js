/* import { postUsers } from "../../services/postF"; */
import { getRequest } from "../../services/get";

document.addEventListener("DOMContentLoaded", async () => {
    const solicitudesCtn = document.getElementById("solicitudesCtn");

    try {

        const solicitudes = await getRequest();

        solicitudes.forEach((solicitud, index) => {
            const solicitudElement = document.createElement("div");
            solicitudElement.classList.add("solicitud-item");
            solicitudElement.innerHTML = `
                <p>Nombre de Usuario: ${solicitud.nombre}</p>
                <p>Sede: ${solicitud.sede}</p>
                <p>Fecha de Salida: ${solicitud.fechaSalida}</p>
                <p>Fecha de Regreso: ${solicitud.fechaRegreso}</p>
                <p>Código de la Computadora: ${solicitud.codigo}</p>
                <button class="edit-btn" data-index="${index}">Editar</button>
                <button class="delete-btn" data-index="${index}">Eliminar</button>
            `;
            solicitudesCtn.appendChild(solicitudElement);
        });

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", handleEdit);
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", handleDelete);
        });

    } catch (error) {
        console.error('Error loading requests:', error);
    }
});

function handleEdit(event) {
    const index = event.target.dataset.index;
    const solicitud = solicitudes[index];
    openEditModal(solicitud);
}

function handleDelete(event) {
    const index = event.target.dataset.index;
    deleteSolicitud(index);
}

function openEditModal(solicitud) {
    const modal = document.getElementById("editModal");
    modal.style.display = "block";

    document.getElementById("editNombre").value = solicitud.nombre;
    document.getElementById("editSede").value = solicitud.sede;
    document.getElementById("editFechaSalida").value = solicitud.fechaSalida;
    document.getElementById("editFechaRegreso").value = solicitud.fechaRegreso;
    document.getElementById("editCodigo").value = solicitud.codigo;
}

function closeModal() {
    const modal = document.getElementById("editModal");
    modal.style.display = "none";
}

document.getElementById("closeModal").addEventListener("click", closeModal);

