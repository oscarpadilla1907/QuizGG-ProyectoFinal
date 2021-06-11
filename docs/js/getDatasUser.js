const URL = 'https://immense-cove-70793.herokuapp.com';

//LAMADA A STRAPI
async function getRequest(url) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return fetch(url, options)
        .then(response => response.json())
        .then(data => data);
}

//GET PARA RECOGER LOS DATOS DE USUARIO 
async function getUser() {
    const result = await getRequest(URL + '/users');

    for (let i = 0; i < result.length; i++) {
        if (result[i].email == email){
            
            let nombre = document.getElementById('user');
            nombre.innerText = result[i].username;

            let dinero = document.getElementById('coins');
            dinero.innerText = localStorage.getItem('coins');
        }
    }
    
}
