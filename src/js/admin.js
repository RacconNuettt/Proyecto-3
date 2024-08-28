import { getRequest } from "../../services/get.js"; // Para obtener las solicitudes existentes
import { postSolicitud } from "../../services/postR.js"; // Para enviar el estado a la API solicitud

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const solicitudes = await getRequest();
        console.log(solicitudes); // Para verificar las solicitudes obtenidas

        solicitudes.forEach((solicitud, index) => {
            const solicitudRow = document.createElement("tr");
            solicitudRow.id = `solicitud-${index}`;
            solicitudRow.innerHTML = `
                <td>${solicitud.nombre}</td>
                <td>${solicitud.sede}</td>
                <td>${solicitud.fechaSalida}</td>
                <td>${solicitud.fechaRegreso}</td>
                <td>${solicitud.codigo}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Ver</button>
                    <span id="status-${index}" class="status">
                        ${solicitud.status === 'accepted' ? '✔️' : solicitud.status === 'rejected' ? '❌' : ''}
                    </span>
                </td>
            `;
            solicitudesCtn.appendChild(solicitudRow);
        });

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", (event) => handleEdit(event, solicitudes));
        });

    } catch (error) {
        console.error('Error cargando solicitudes:', error);
    }
});

function handleEdit(event, solicitudes) {
    const index = event.target.dataset.index;
    const solicitud = solicitudes[index];
    
    if (solicitud.status === 'accepted' || solicitud.status === 'rejected') {
        alert('Esta solicitud ya ha sido procesada y no puede ser modificada.');
        return;
    }

    openEditModal(solicitud, index);
}

function openEditModal(solicitud, index) {
    const modal = document.getElementById("editModal");
    modal.style.display = "block";

    document.getElementById("editNombre").value = solicitud.nombre;
    document.getElementById("editSede").value = solicitud.sede;
    document.getElementById("editFechaSalida").value = solicitud.fechaSalida;
    document.getElementById("editFechaRegreso").value = solicitud.fechaRegreso;
    document.getElementById("editCodigo").value = solicitud.codigo;

    document.getElementById("acceptRequest").onclick = () => handleAccept(index, solicitudes);
    document.getElementById("rejectRequest").onclick = () => handleReject(index, solicitudes);
}

function closeModal() {
    const modal = document.getElementById("editModal");
    modal.style.display = "none";
}

async function handleAccept(index, solicitudes) {
    solicitudes[index].status = 'accepted';
    await postSolicitud({
        id: solicitudes[index].id,
        status: 'accepted'
    });
    updateSolicitudStatus(index, 'accepted');
    closeModal();
}

async function handleReject(index, solicitudes) {
    solicitudes[index].status = 'rejected';
    await postSolicitud({
        id: solicitudes[index].id,
        status: 'rejected'
    });
    updateSolicitudStatus(index, 'rejected');
    closeModal();
}

function updateSolicitudStatus(index, status) {
    const statusSpan = document.getElementById(`status-${index}`);
    if (statusSpan) {
        statusSpan.innerHTML = status === 'accepted' ? '✔️' : status === 'rejected' ? '❌' : '';
    }
}

document.getElementById("closeModal").addEventListener("click", closeModal);