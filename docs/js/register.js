const URL = 'https://immense-cove-70793.herokuapp.com/auth/local/register';

//METODO POST A STRAPI
function postRequest(name, mail, pass){
    const options = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body:JSON.stringify( {
            username:name,
            email:mail,
            password:pass
        }),
    };
    return fetch(URL, options)
        .then(response => response.json())
        .then(data => data);
}
