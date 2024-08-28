async function updateRequest(solicitud) {
    try {
        const response = await fetch(`http://localhost:3001/compus/${solicitud.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(solicitud)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la solicitud');
        }
        return await response.json();
    } catch (error) {
        console.error('Error en updateRequest:', error);
        throw error;
    }
}

export { updateRequest };