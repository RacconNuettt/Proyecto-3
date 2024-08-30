import { getRequest } from "../../services/getC.js";
import { postSolicitud } from "../../services/postR.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {

        let solicitudes = await getRequest();
        console.log(solicitudes);

        const storedSolicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];

        solicitudes = solicitudes.filter(solicitud => !storedSolicitudes.some(stored => stored.id === solicitud.id && (stored.status === 'accepted' || stored.status === 'rejected')));

        localStorage.setItem('solicitudes', JSON.stringify(solicitudes));

        const solicitudesCtn = document.getElementById("solicitudesCtn");

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
                </td>
                <td>
                    <select class="status-select" data-index="${index}">
                        <option value="pending" ${solicitud.status === 'pending' ? 'selected' : ''}>Pendiente</option>
                        <option value="accepted" ${solicitud.status === 'accepted' ? 'selected' : ''}>Aceptar</option>
                        <option value="rejected" ${solicitud.status === 'rejected' ? 'selected' : ''}>Rechazar</option>
                    </select>
                </td>
            `;
            solicitudesCtn.appendChild(solicitudRow);
        });

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", (event) => handleEdit(event));
        });

        document.querySelectorAll(".status-select").forEach(select => {
            select.addEventListener("change", (event) => handleStatusChange(event));
        });

    } catch (error) {
        console.error('Error cargando solicitudes:', error);
    }
});

function handleEdit(event) {
    const index = event.target.dataset.index;
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    const solicitud = solicitudes[index];

    if (solicitud) {
        const modal = document.getElementById("editModal");
        modal.style.display = "block";

        document.getElementById("editNombre").value = solicitud.nombre;
        document.getElementById("editSede").value = solicitud.sede;
        document.getElementById("editFechaSalida").value = solicitud.fechaSalida;
        document.getElementById("editFechaRegreso").value = solicitud.fechaRegreso;
        document.getElementById("editCodigo").value = solicitud.codigo;
    }
}

function handleStatusChange(event) {
    const index = event.target.dataset.index;
    const status = event.target.value;

    actualizar(index, status);

    sincronizar(index, status);

    if (status === 'accepted' || status === 'rejected') {
        document.getElementById(`solicitud-${index}`).remove();
    }
}

function actualizar(index, status) {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];

    if (solicitudes[index]) {
        solicitudes[index].status = status;
        localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
    }
}

async function sincronizar(index, status) {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    const solicitud = solicitudes[index];

    if (solicitud) {
        const datosR = {
            id: solicitud.id,
            fechaSalida: solicitud.fechaSalida,
            fechaRegreso: solicitud.fechaRegreso,
            codigo: solicitud.codigo,
            status: status
        };

        try {
            const response = await fetch("http://localhost:3001/solicitud", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosR)
            });

            if (!response.ok) {
                throw new Error('Error al enviar la solicitud');
            }

            console.log('Sincronización exitosa con db.json');
        } catch (error) {
            console.error('Error sincronizando con db.json:', error);
        }
    }
}

function closeModal() {
    const modal = document.getElementById("editModal");
    modal.style.display = "none";
}

document.getElementById("closeModal").addEventListener("click", closeModal);
