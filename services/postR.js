export async function postSolicitud(solicitud) {
    try {

        const userRequest = {
            solicitud,
        }
        
        const response = await fetch("http://localhost:3001/solicitud", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(solicitud)
        });

        if (!response.ok) {
            throw new Error('Error al enviar la solicitud');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        throw error;
    }
}