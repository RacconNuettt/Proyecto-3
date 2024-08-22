
async function postUsers(nombre,sede,fechaSalida,fechaRegreso,codigo) {
    try {
     
        const userData = { 
            nombre,
            sede,
            fechaSalida,
            fechaRegreso,
            codigo
        };
        const response = await fetch("http://localhost:3001/compus", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        return await response.json();
  
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}
export{postUsers}