//CONSTANTE DE LA URL STRAPI
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

//FUNCION PARA RECOGER LOS LEVELS DE STRAPI
async function getLevels() {
    const result = await getRequest(URL + '/Levels');

    for (let i = 0; i < result.length; i++) {

        //CREACION DEL DIV CONTAINER
        let div_container = document.createElement('div');
        div_container.className = 'container';

        //CREACION DE LA BOOTSTRAP CARD Y SE AÑADE AL CONTAINER
        let div_card = document.createElement('div');
        div_card.className = 'card mb-3';
        div_card.style = 'max-width: 540px; max-height: 160px;';
        div_container.appendChild(div_card);

        //CREACION DE ROW CARD Y SE AÑADE A LA CARD
        let div_row = document.createElement('div');
        div_row.className = 'row g-0';
        div_row.style = 'max-width: 540px; max-height: 160px;';
        div_card.appendChild(div_row);

        //CREACION DE COL-MD-4 FOTO Y SE AÑADE AL ROW
        let div_col_img = document.createElement('div');
        div_col_img.className = 'col-md-4';
        div_col_img.style = 'max-width: 540px; max-height: 160px;';
        div_row.appendChild(div_col_img);

        //IMAGEN div_col_img Y SE AÑADE AL COL-MD-4
        let img = document.createElement('img');
        img.src = result[i].imagen;
        img.className = 'img-card';
        div_col_img.appendChild(img);

        //CREACION COL-MD-8 Y SE AÑADE AL ROW
        let div_md_8 = document.createElement('div');
        div_md_8.className = 'col-md-8';
        div_row.appendChild(div_md_8);

        //CREACION DE CARD BODY Y SE AÑADE A MD-8
        let div_card_body = document.createElement('div');
        div_card_body.className = 'card-body';
        div_md_8.appendChild(div_card_body);

        //CREACION DE LOS CARD BODY ELEMENTS
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
        card_title.appendChild(span_name_quiz);

        let card_text = document.createElement('p');
        card_text.className = 'card-text';
        card_text.innerText = result[i].descripcion;
        div_card_body.appendChild(card_text);

        //BARRA DE PROGRESO
        let div_progress = document.createElement('div');
        div_progress.className = 'progress';

        let div_progress_bar = document.createElement('div');
        if (result[i].dificultad == 'easy') {
            div_progress_bar.className = 'progress-bar w-25 bg-succes';
        } else if (result[i].dificultad == 'medium') {
            div_progress_bar.className = 'progress-bar w-50 bg-warning';
        } else if (result[i].dificultad == 'hard') {
            div_progress_bar.className = 'progress-bar w-75 bg-danger';
        }

        div_progress_bar.setAttribute('role', 'progressbar');
        div_progress_bar.setAttribute('aria-valuenow', '75');
        div_progress_bar.setAttribute('aria-valuemin', '0');
        div_progress_bar.setAttribute('aria-valuemax', '100');
        div_progress_bar.innerText = result[i].dificultad;
        div_progress.appendChild(div_progress_bar);
        div_card_body.appendChild(div_progress);

        //AÑADIR AL BODY
        document.body.appendChild(div_container);
    }
}

