function verificar() {
    let mail = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    getDates(mail);
    postRequest(mail, password);
}

const URL = 'http://localhost:8082/';

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
    return fetch(URL + 'auth/local', options)
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
        }
    }
}
