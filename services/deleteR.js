async function DeleteHistory() {
    try {
        const response = await fetch('http://localhost:3001/solicitud', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al limpiar el historial');
        }

        console.log('Historial limpiado exitosamente');
    } catch (error) {
        console.error('Error al limpiar el historial:', error);
    }
}

export{DeleteHistory}
