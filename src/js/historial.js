import { getSolicitud } from "../../services/getS.js"; 
import { DeleteHistory } from "../../services/deleteR.js"; 

document.addEventListener("DOMContentLoaded", async () => {
    try {

        const solicitudes = await getSolicitud();

        const historialSolicitudes = solicitudes.filter(solicitud => solicitud.status === 'accepted' || solicitud.status === 'rejected');

        const tableBody = document.querySelector("#solicitudesTable tbody");

        historialSolicitudes.forEach(solicitud => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${solicitud.id}</td>
                <td>${solicitud.fechaSalida}</td>
                <td>${solicitud.fechaRegreso}</td>
                <td>${solicitud.codigo}</td>
                <td>${solicitud.status === 'accepted' ? 'Aceptada' : 'Rechazada'}</td>
            `;
            tableBody.appendChild(row);
        });

        const params = new URLSearchParams(window.location.search);
        if (params.get('updated') === 'true') {
            document.getElementById('updateNotification').style.display = 'block';
        }
        document.getElementById('deleteHistoryBtn').addEventListener('click', async () => {
            if (confirm('¿Estás seguro de que deseas eliminar todo el historial?')) {
                try {
                    tableBody.innerHTML = '';

                    await DeleteHistory();
                } catch (error) {
                    console.error('Error al limpiar el historial:', error);
                }
            }
        });

    } catch (error) {
        console.error('Error cargando los datos del historial:', error);
    }
});
