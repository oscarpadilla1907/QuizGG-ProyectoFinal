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
    console.log("hola1");
    const result = await getRequest(URL+'/levels');
    console.log(result)

    for (let i = 0; i < result.length; i++) {
        console.log("hola");
        //CONTAINER
        let div_container = document.createElement('div');
        div_container.className = 'container';

        //BOOTSTRAP CARD
        let div_card = document.createElement('div');
        div_card.className = 'card mb-3';
        div_card.style = 'max-width: 540px; max-height: 160px;';
        div_container.appendChild(div_card);

        //ROW CARD
        let div_row = document.createElement('div');
        div_row.className = 'row g-0';
        div_row.style = 'max-width: 540px; max-height: 160px;';
        div_card.appendChild(div_row);

        //COL-MD-4 FOTO
        let div_col_img = document.createElement('div');
        div_col_img.className = 'col-md-4';
        div_col_img.style = 'max-width: 540px; max-height: 160px;';
        div_row.appendChild(div_col_img);

        //IMAGEN div_col_img
        let img = document.createElement('img');
        img.src = result[i].imagen;
        img.className = 'img-card';
        div_col_img.appendChild(img);

        //COL-MD-8
        let div_md_8 = document.createElement('div');
        div_md_8.className = 'col-md-8';
        div_row.appendChild(div_md_8);

        //CARD BODY
        let div_card_body = document.createElement('div');
        div_card_body.className = 'card-body';
        div_md_8.appendChild(div_card_body);

        //CARD BODY ELEMENTS
        let play = document.createElement('p');
        play.className = 'preview';
        play.innerText = 'Play';
        div_card_body.appendChild(play);

        let card_title = document.createElement('h5');
        card_title.className = 'card-title';
        card_title.innerText = 'Quiz de ';
        div_card_body.appendChild(card_title);

        let span_name_quiz = document.createElement('span');
        span_name_quiz.className = 'GG';
        span_name_quiz.innerText = result[i].Name;
        card_title.appendChild(span_name_quiz);

        let card_text = document.createElement('p');
        card_text.className = 'card-text';
        card_text.innerText = result[i].Descripcion;
        div_card_body.appendChild(card_text);

        //BARRA DE PROGRESO
        let div_progress = document.createElement('div');
        div_progress.className = 'progress';

        let div_progress_bar = document.createElement('div');
        if (result[i].Dificultad == 'Facil') {
            div_progress_bar.className = 'progress-bar w-25 bg-succes';
        } else if (result[i].Dificultad == 'Medio') {
            div_progress_bar.className = 'progress-bar w-50 bg-warning';
        } else if (result[i].Dificultad == 'Dificil') {
            div_progress_bar.className = 'progress-bar w-75 bg-danger';
        }

        div_progress_bar.setAttribute('role', 'progressbar');
        div_progress_bar.setAttribute('aria-valuenow', '75');
        div_progress_bar.setAttribute('aria-valuemin', '0');
        div_progress_bar.setAttribute('aria-valuemax', '100');
        div_progress_bar.innerText = result[i].Dificultad;
        div_progress.appendChild(div_progress_bar);
        div_card_body.appendChild(div_progress);

        //AÑADIR AL BODY
        document.body.appendChild(div_container);
        document.getElementById('botonGenerar').className = 'hidden';
    }
}
