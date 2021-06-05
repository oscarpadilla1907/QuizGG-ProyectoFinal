const URL = 'http://localhost:8082';

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

async function getLevels() {
    const result = await getRequest(URL+'/levels');
}