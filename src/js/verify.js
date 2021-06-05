<<<<<<< HEAD
var levels = ["Anime"];

=======
const URL = 'http://localhost:8082/';

//RECOGER EL MAIL Y LAS PASS PARA LLAMAR A POSTREQUEST
>>>>>>> 224b87fc8f1b627fcc3c77cb57bb4ed3bcb92474
function verificar() {
    let mail = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    getDates(mail);
    postRequest(mail, password);
}

//LAMADA A STRAPI
function postRequest(email, pass) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identifier: email,
            password: pass
        }),
    };
    return fetch(URL+'auth/local', options)
        .then(response => {
            if (response.status !== 200) {
                alert('Introduce bien tus credenciales1');
            } else {
                response.json()
                    .then(data => {
                        alert('Te has logueado correctamente');
                        window.location.href = "home.html";
                    })
                    .catch(error => {
                        alert('Introduce bien tus credenciales2');
                    })
            }
        })
        .catch(error => {
            alert('Introduce bien tus credenciales3');
        });
}

//METODO GET
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

//RECOGER DATOS Y GUARDAR EN EL LOCALSTORAGE
async function getDates(email) {
    const result = await getRequest(URL + 'users');
    console.log('result', result);
    for (let i = 0; i < result.length; i++) {
        if (result[i].email == email) {
            localStorage.setItem('id', result[i].id);
            console.log(localStorage.getItem('id'))
            localStorage.setItem('email', email);
            localStorage.setItem('username', result[i].username);
            localStorage.setItem('coins', result[i].coins);
            localStorage.setItem('lvlActual', undefined);
            localStorage.setItem("NivelesDisponibles", JSON.stringify(levels));
        }
    }
}
