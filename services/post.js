
async function postUsers(firstName,lastName,email,password,role) {
    try {
        const userData = { 
            firstName,
            lastName,
            email,
            password,
            role
        };
        const response = await fetch("http://localhost:3001/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        return await response.json();
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}

export{postUsers}
