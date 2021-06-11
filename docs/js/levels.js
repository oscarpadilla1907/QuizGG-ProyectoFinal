const URL = 'https://immense-cove-70793.herokuapp.com';
var lvlActual = '';
var respuestaCorrecta = '';
var contador = 0;
lvlsDiponibles = JSON.parse(localStorage.getItem("NivelesDisponibles"));
var correctas = 0;
var falladas = 0;
var monedasGanadas = 0;

//METODO GET A STRAPI
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

//GET PARA CREAR LAS CARDS
async function getLevels() {
    console.log("hola1 " + lvlsDiponibles);
    const result = await getRequest(URL + '/levels');
    console.log(result)

    for (let i = 0; i < result.length; i++) {
        if (lvlsDiponibles.includes(result[i].Name)) {
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
            play.value = result[i].Name;
            play.addEventListener("click", cargarHTML, false);
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
}

function cargarHTML() {
    window.location.href = 'quiz.html';
    localStorage.setItem('lvlActual', this.value);
}


async function cargarLevel() {
    const result = await getRequest(URL + '/levels');
    lvlActual = localStorage.getItem('lvlActual');
    for (var i = 0; i < result.length; i++) {
        if (lvlActual == result[i].Name) {
                contador = 1;
                respuestaCorrecta = result[i].RespuestaCorrecta1;
                console.log("Lvl Actual = " + lvlActual + " Result = " + result[i].Name);

                let container = document.createElement('center');
                container.id = "question1";
                document.body.appendChild(container);

                let titleQuiz = document.createElement('div');
                titleQuiz.className = 'text';

                let titleQuizText = document.createElement('p');
                titleQuizText.className = 'quizgg';
                titleQuizText.innerText = 'Quiz de ';
                titleQuiz.appendChild(titleQuizText);

                let spanName = document.createElement('span');
                spanName.className = 'GG';
                spanName.innerText = result[i].Name;
                titleQuizText.appendChild(spanName);
                container.appendChild(titleQuiz);

                let div_pregunta = document.createElement('div');
                div_pregunta.className = 'pregunta';

                let txt_pregunta = document.createElement('p');
                txt_pregunta.className = 'pregunta-text';
                txt_pregunta.innerText = result[i].Pregunta1;
                div_pregunta.appendChild(txt_pregunta);
                container.appendChild(div_pregunta);

                let div_container = document.createElement('div');
                div_container.className = 'container';

                let div_card = document.createElement('div');
                div_card.className = 'card';
                div_container.appendChild(div_card);

                let card_text = document.createElement('p');
                card_text.className = 'card-text';
                card_text.value = result[i].Respuesta1A;
                card_text.innerText = result[i].Respuesta1A;
                card_text.addEventListener("click", validate, false);
                div_card.appendChild(card_text);
                container.appendChild(div_container);

                let div_container2 = document.createElement('div');
                div_container2.className = 'container';

                let div_card2 = document.createElement('div');
                div_card2.className = 'card';
                div_container2.appendChild(div_card2);

                let card_text2 = document.createElement('p');
                card_text2.className = 'card-text';
                card_text2.value = result[i].Respuesta1B;
                card_text2.innerText = result[i].Respuesta1B;
                card_text2.addEventListener("click", validate, false);
                div_card2.appendChild(card_text2);
                container.appendChild(div_container2);

                let div_container3 = document.createElement('div');
                div_container3.className = 'container';

                let div_card3 = document.createElement('div');
                div_card3.className = 'card';
                div_container3.appendChild(div_card3);

                let card_text3 = document.createElement('p');
                card_text3.className = 'card-text';
                card_text3.value = result[i].Respuesta1C;
                card_text3.innerText = result[i].Respuesta1C;
                card_text3.addEventListener("click", validate, false);
                div_card3.appendChild(card_text3);
                container.appendChild(div_container3);

                let div_container4 = document.createElement('div');
                div_container4.className = 'container';

                let amodal = document.createElement ('a');
                amodal.setAttribute("data-bs-toggle", "modal");
                amodal.setAttribute("data-bs-target", "#exampleModal");
                div_container4.appendChild(amodal);

                let img_exit = document.createElement('img');
                img_exit.className = 'exit-';
                img_exit.src = "/src/static/img/logout2.png";
                amodal.appendChild(img_exit);
                container.appendChild(div_container4);

        }
    }
}

function validate(){
    var respuesta = this.value;
    console.log(respuestaCorrecta);
    if (respuestaCorrecta == respuesta){
        alert("Respuesta correcta, ganas 10 monedas");
        correctas = correctas + 1;
        monedasGanadas = monedasGanadas + 10;
        if (contador == 1){
            pregunta2();
        }else if(contador == 2){
            pregunta3();
        }else if(contador == 3){
            pregunta4();
        }else if(contador == 4){
            pregunta5();
        }else if(contador == 5){
            pregunta6();
        }else if(contador == 6){
            pregunta7();
        }else if(contador == 7){
            pregunta8();
        }else if(contador == 8){
            pregunta9();
        }else if(contador == 9){
            pregunta10();
        }else if(contador == 10){
            endQuiz();
        }
    }else{
        alert("Respuesta incorrecta");
        falladas = falladas + 1;
        if (contador == 1){
            pregunta2();
        }else if(contador == 2){
            pregunta3();
        }else if(contador == 3){
            pregunta4();
        }else if(contador == 4){
            pregunta5();
        }else if(contador == 5){
            pregunta6();
        }else if(contador == 6){
            pregunta7();
        }else if(contador == 7){
            pregunta8();
        }else if(contador == 8){
            pregunta9();
        }else if(contador == 9){
            pregunta10();
        }else if(contador == 10){
            endQuiz();
        }
    }
}

function endQuiz(){
    alert("Nivel completado, has acertado "+correctas+" preguntas y has fallado "+falladas+". Has ganado "+monedasGanadas+" monedas");
    correctas = 0;
    falladas = 0;
    var monedasTotales = parseInt(localStorage.getItem('coins'));
    console.log(monedasTotales.type)
    monedasGanadas = monedasTotales + monedasGanadas; 
    localStorage.setItem('coins', monedasGanadas);
    monedasGanadas = 0;
    window.location.href = 'levels.html';
}

async function pregunta2(){
    const result = await getRequest(URL + '/levels');
    lvlActual = localStorage.getItem('lvlActual');
    for (var i = 0; i < result.length; i++) {
        if (lvlActual == result[i].Name) {
                var deleted = document.getElementById('question1');
                deleted.remove();
                contador = 2;
                respuestaCorrecta = result[i].RespuestaCorrecta2;
                console.log("Lvl Actual = " + lvlActual + " Result = " + result[i].Name);

                let container = document.createElement('center');
                container.id = 'question2';
                document.body.appendChild(container);

                let titleQuiz = document.createElement('div');
                titleQuiz.className = 'text';

                let titleQuizText = document.createElement('p');
                titleQuizText.className = 'quizgg';
                titleQuizText.innerText = 'Quiz de ';
                titleQuiz.appendChild(titleQuizText);

                let spanName = document.createElement('span');
                spanName.className = 'GG';
                spanName.innerText = result[i].Name;
                titleQuizText.appendChild(spanName);
                container.appendChild(titleQuiz);

                let div_pregunta = document.createElement('div');
                div_pregunta.className = 'pregunta';

                let txt_pregunta = document.createElement('p');
                txt_pregunta.className = 'pregunta-text';
                txt_pregunta.innerText = result[i].Pregunta2;
                div_pregunta.appendChild(txt_pregunta);
                container.appendChild(div_pregunta);

                let div_container = document.createElement('div');
                div_container.className = 'container';

                let div_card = document.createElement('div');
                div_card.className = 'card';
                div_container.appendChild(div_card);

                let card_text = document.createElement('p');
                card_text.className = 'card-text';
                card_text.value = result[i].Respuesta2A;
                card_text.innerText = result[i].Respuesta2A;
                card_text.addEventListener("click", validate, false);
                div_card.appendChild(card_text);
                container.appendChild(div_container);

                let div_container2 = document.createElement('div');
                div_container2.className = 'container';

                let div_card2 = document.createElement('div');
                div_card2.className = 'card';
                div_container2.appendChild(div_card2);

                let card_text2 = document.createElement('p');
                card_text2.className = 'card-text';
                card_text2.value = result[i].Respuesta2B;
                card_text2.innerText = result[i].Respuesta2B;
                card_text2.addEventListener("click", validate, false);
                div_card2.appendChild(card_text2);
                container.appendChild(div_container2);

                let div_container3 = document.createElement('div');
                div_container3.className = 'container';

                let div_card3 = document.createElement('div');
                div_card3.className = 'card';
                div_container3.appendChild(div_card3);

                let card_text3 = document.createElement('p');
                card_text3.className = 'card-text';
                card_text3.value = result[i].Respuesta2C;
                card_text3.innerText = result[i].Respuesta2C;
                card_text3.addEventListener("click", validate, false);
                div_card3.appendChild(card_text3);
                container.appendChild(div_container3);

                let div_container4 = document.createElement('div');
                div_container4.className = 'container';

                let amodal = document.createElement ('a');
                amodal.setAttribute("data-bs-toggle", "modal");
                amodal.setAttribute("data-bs-target", "#exampleModal");
                div_container4.appendChild(amodal);

                let img_exit = document.createElement('img');
                img_exit.className = 'exit-';
                img_exit.src = "/src/static/img/logout2.png";
                amodal.appendChild(img_exit);
                container.appendChild(div_container4);

        }
    }
}

async function pregunta3(){
    const result = await getRequest(URL + '/levels');
    lvlActual = localStorage.getItem('lvlActual');
    for (var i = 0; i < result.length; i++) {
        if (lvlActual == result[i].Name) {
                var deleted = document.getElementById('question2');
                deleted.remove();
                contador = 3;
                respuestaCorrecta = result[i].RespuestaCorrecta3;
                console.log("Lvl Actual = " + lvlActual + " Result = " + result[i].Name);

                let container = document.createElement('center');
                container.id = 'question3';
                document.body.appendChild(container);

                let titleQuiz = document.createElement('div');
                titleQuiz.className = 'text';

                let titleQuizText = document.createElement('p');
                titleQuizText.className = 'quizgg';
                titleQuizText.innerText = 'Quiz de ';
                titleQuiz.appendChild(titleQuizText);

                let spanName = document.createElement('span');
                spanName.className = 'GG';
                spanName.innerText = result[i].Name;
                titleQuizText.appendChild(spanName);
                container.appendChild(titleQuiz);

                let div_pregunta = document.createElement('div');
                div_pregunta.className = 'pregunta';

                let txt_pregunta = document.createElement('p');
                txt_pregunta.className = 'pregunta-text';
                txt_pregunta.innerText = result[i].Pregunta3;
                div_pregunta.appendChild(txt_pregunta);
                container.appendChild(div_pregunta);

                let div_container = document.createElement('div');
                div_container.className = 'container';

                let div_card = document.createElement('div');
                div_card.className = 'card';
                div_container.appendChild(div_card);

                let card_text = document.createElement('p');
                card_text.className = 'card-text';
                card_text.value = result[i].Respuesta3A;
                card_text.innerText = result[i].Respuesta3A;
                card_text.addEventListener("click", validate, false);
                div_card.appendChild(card_text);
                container.appendChild(div_container);

                let div_container2 = document.createElement('div');
                div_container2.className = 'container';

                let div_card2 = document.createElement('div');
                div_card2.className = 'card';
                div_container2.appendChild(div_card2);

                let card_text2 = document.createElement('p');
                card_text2.className = 'card-text';
                card_text2.value = result[i].Respuesta3B;
                card_text2.innerText = result[i].Respuesta3B;
                card_text2.addEventListener("click", validate, false);
                div_card2.appendChild(card_text2);
                container.appendChild(div_container2);

                let div_container3 = document.createElement('div');
                div_container3.className = 'container';

                let div_card3 = document.createElement('div');
                div_card3.className = 'card';
                div_container3.appendChild(div_card3);

                let card_text3 = document.createElement('p');
                card_text3.className = 'card-text';
                card_text3.value = result[i].Respuesta3C;
                card_text3.innerText = result[i].Respuesta3C;
                card_text3.addEventListener("click", validate, false);
                div_card3.appendChild(card_text3);
                container.appendChild(div_container3);

                let div_container4 = document.createElement('div');
                div_container4.className = 'container';

                let amodal = document.createElement ('a');
                amodal.setAttribute("data-bs-toggle", "modal");
                amodal.setAttribute("data-bs-target", "#exampleModal");
                div_container4.appendChild(amodal);

                let img_exit = document.createElement('img');
                img_exit.className = 'exit-';
                img_exit.src = "/src/static/img/logout2.png";
                amodal.appendChild(img_exit);
                container.appendChild(div_container4);

        }
    }
}

async function pregunta4(){
    const result = await getRequest(URL + '/levels');
    lvlActual = localStorage.getItem('lvlActual');
    for (var i = 0; i < result.length; i++) {
        if (lvlActual == result[i].Name) {
                var deleted = document.getElementById('question3');
                deleted.remove();
                contador = 4;
                respuestaCorrecta = result[i].RespuestaCorrecta4;
                console.log("Lvl Actual = " + lvlActual + " Result = " + result[i].Name);

                let container = document.createElement('center');
                container.id = 'question4';
                document.body.appendChild(container);

                let titleQuiz = document.createElement('div');
                titleQuiz.className = 'text';

                let titleQuizText = document.createElement('p');
                titleQuizText.className = 'quizgg';
                titleQuizText.innerText = 'Quiz de ';
                titleQuiz.appendChild(titleQuizText);

                let spanName = document.createElement('span');
                spanName.className = 'GG';
                spanName.innerText = result[i].Name;
                titleQuizText.appendChild(spanName);
                container.appendChild(titleQuiz);

                let div_pregunta = document.createElement('div');
                div_pregunta.className = 'pregunta';

                let txt_pregunta = document.createElement('p');
                txt_pregunta.className = 'pregunta-text';
                txt_pregunta.innerText = result[i].Pregunta4;
                div_pregunta.appendChild(txt_pregunta);
                container.appendChild(div_pregunta);

                let div_container = document.createElement('div');
                div_container.className = 'container';

                let div_card = document.createElement('div');
                div_card.className = 'card';
                div_container.appendChild(div_card);

                let card_text = document.createElement('p');
                card_text.className = 'card-text';
                card_text.value = result[i].Respuesta4A;
                card_text.innerText = result[i].Respuesta4A;
                card_text.addEventListener("click", validate, false);
                div_card.appendChild(card_text);
                container.appendChild(div_container);

                let div_container2 = document.createElement('div');
                div_container2.className = 'container';

                let div_card2 = document.createElement('div');
                div_card2.className = 'card';
                div_container2.appendChild(div_card2);

                let card_text2 = document.createElement('p');
                card_text2.className = 'card-text';
                card_text2.value = result[i].Respuesta4B;
                card_text2.innerText = result[i].Respuesta4B;
                card_text2.addEventListener("click", validate, false);
                div_card2.appendChild(card_text2);
                container.appendChild(div_container2);

                let div_container3 = document.createElement('div');
                div_container3.className = 'container';

                let div_card3 = document.createElement('div');
                div_card3.className = 'card';
                div_container3.appendChild(div_card3);

                let card_text3 = document.createElement('p');
                card_text3.className = 'card-text';
                card_text3.value = result[i].Respuesta4C;
                card_text3.innerText = result[i].Respuesta4C;
                card_text3.addEventListener("click", validate, false);
                div_card3.appendChild(card_text3);
                container.appendChild(div_container3);

                let div_container4 = document.createElement('div');
                div_container4.className = 'container';

                let amodal = document.createElement ('a');
                amodal.setAttribute("data-bs-toggle", "modal");
                amodal.setAttribute("data-bs-target", "#exampleModal");
                div_container4.appendChild(amodal);

                let img_exit = document.createElement('img');
                img_exit.className = 'exit-';
                img_exit.src = "/src/static/img/logout2.png";
                amodal.appendChild(img_exit);
                container.appendChild(div_container4);

        }
    }
}

async function pregunta5(){
    const result = await getRequest(URL + '/levels');
    lvlActual = localStorage.getItem('lvlActual');
    for (var i = 0; i < result.length; i++) {
        if (lvlActual == result[i].Name) {
                var deleted = document.getElementById('question4');
                deleted.remove();
                contador = 5;
                respuestaCorrecta = result[i].RespuestaCorrecta5;
                console.log("Lvl Actual = " + lvlActual + " Result = " + result[i].Name);

                let container = document.createElement('center');
                container.id = 'question5';
                document.body.appendChild(container);

                let titleQuiz = document.createElement('div');
                titleQuiz.className = 'text';

                let titleQuizText = document.createElement('p');
                titleQuizText.className = 'quizgg';
                titleQuizText.innerText = 'Quiz de ';
                titleQuiz.appendChild(titleQuizText);

                let spanName = document.createElement('span');
                spanName.className = 'GG';
                spanName.innerText = result[i].Name;
                titleQuizText.appendChild(spanName);
                container.appendChild(titleQuiz);

                let div_pregunta = document.createElement('div');
                div_pregunta.className = 'pregunta';

                let txt_pregunta = document.createElement('p');
                txt_pregunta.className = 'pregunta-text';
                txt_pregunta.innerText = result[i].Pregunta5;
                div_pregunta.appendChild(txt_pregunta);
                container.appendChild(div_pregunta);

                let div_container = document.createElement('div');
                div_container.className = 'container';

                let div_card = document.createElement('div');
                div_card.className = 'card';
                div_container.appendChild(div_card);

                let card_text = document.createElement('p');
                card_text.className = 'card-text';
                card_text.value = result[i].Respuesta5A;
                card_text.innerText = result[i].Respuesta5A;
                card_text.addEventListener("click", validate, false);
                div_card.appendChild(card_text);
                container.appendChild(div_container);

                let div_container2 = document.createElement('div');
                div_container2.className = 'container';

                let div_card2 = document.createElement('div');
                div_card2.className = 'card';
                div_container2.appendChild(div_card2);

                let card_text2 = document.createElement('p');
                card_text2.className = 'card-text';
                card_text2.value = result[i].Respuesta5B;
                card_text2.innerText = result[i].Respuesta5B;
                card_text2.addEventListener("click", validate, false);
                div_card2.appendChild(card_text2);
                container.appendChild(div_container2);

                let div_container3 = document.createElement('div');
                div_container3.className = 'container';

                let div_card3 = document.createElement('div');
                div_card3.className = 'card';
                div_container3.appendChild(div_card3);

                let card_text3 = document.createElement('p');
                card_text3.className = 'card-text';
                card_text3.value = result[i].Respuesta5C;
                card_text3.innerText = result[i].Respuesta5C;
                card_text3.addEventListener("click", validate, false);
                div_card3.appendChild(card_text3);
                container.appendChild(div_container3);

                let div_container4 = document.createElement('div');
                div_container4.className = 'container';

                let amodal = document.createElement ('a');
                amodal.setAttribute("data-bs-toggle", "modal");
                amodal.setAttribute("data-bs-target", "#exampleModal");
                div_container4.appendChild(amodal);

                let img_exit = document.createElement('img');
                img_exit.className = 'exit-';
                img_exit.src = "/src/static/img/logout2.png";
                amodal.appendChild(img_exit);
                container.appendChild(div_container4);

        }
    }
}

async function pregunta6(){
    const result = await getRequest(URL + '/levels');
    lvlActual = localStorage.getItem('lvlActual');
    for (var i = 0; i < result.length; i++) {
        if (lvlActual == result[i].Name) {
                var deleted = document.getElementById('question5');
                deleted.remove();
                contador = 6;
                respuestaCorrecta = result[i].RespuestaCorrecta6;
                console.log("Lvl Actual = " + lvlActual + " Result = " + result[i].Name);

                let container = document.createElement('center');
                container.id = 'question6';
                document.body.appendChild(container);

                let titleQuiz = document.createElement('div');
                titleQuiz.className = 'text';

                let titleQuizText = document.createElement('p');
                titleQuizText.className = 'quizgg';
                titleQuizText.innerText = 'Quiz de ';
                titleQuiz.appendChild(titleQuizText);

                let spanName = document.createElement('span');
                spanName.className = 'GG';
                spanName.innerText = result[i].Name;
                titleQuizText.appendChild(spanName);
                container.appendChild(titleQuiz);

                let div_pregunta = document.createElement('div');
                div_pregunta.className = 'pregunta';

                let txt_pregunta = document.createElement('p');
                txt_pregunta.className = 'pregunta-text';
                txt_pregunta.innerText = result[i].Pregunta6;
                div_pregunta.appendChild(txt_pregunta);
                container.appendChild(div_pregunta);

                let div_container = document.createElement('div');
                div_container.className = 'container';

                let div_card = document.createElement('div');
                div_card.className = 'card';
                div_container.appendChild(div_card);

                let card_text = document.createElement('p');
                card_text.className = 'card-text';
                card_text.value = result[i].Respuesta6A;
                card_text.innerText = result[i].Respuesta6A;
                card_text.addEventListener("click", validate, false);
                div_card.appendChild(card_text);
                container.appendChild(div_container);

                let div_container2 = document.createElement('div');
                div_container2.className = 'container';

                let div_card2 = document.createElement('div');
                div_card2.className = 'card';
                div_container2.appendChild(div_card2);

                let card_text2 = document.createElement('p');
                card_text2.className = 'card-text';
                card_text2.value = result[i].Respuesta6B;
                card_text2.innerText = result[i].Respuesta6B;
                card_text2.addEventListener("click", validate, false);
                div_card2.appendChild(card_text2);
                container.appendChild(div_container2);

                let div_container3 = document.createElement('div');
                div_container3.className = 'container';

                let div_card3 = document.createElement('div');
                div_card3.className = 'card';
                div_container3.appendChild(div_card3);

                let card_text3 = document.createElement('p');
                card_text3.className = 'card-text';
                card_text3.value = result[i].Respuesta6C;
                card_text3.innerText = result[i].Respuesta6C;
                card_text3.addEventListener("click", validate, false);
                div_card3.appendChild(card_text3);
                container.appendChild(div_container3);

                let div_container4 = document.createElement('div');
                div_container4.className = 'container';

                let amodal = document.createElement ('a');
                amodal.setAttribute("data-bs-toggle", "modal");
                amodal.setAttribute("data-bs-target", "#exampleModal");
                div_container4.appendChild(amodal);

                let img_exit = document.createElement('img');
                img_exit.className = 'exit-';
                img_exit.src = "/src/static/img/logout2.png";
                amodal.appendChild(img_exit);
                container.appendChild(div_container4);

        }
    }
}

async function pregunta7(){
    const result = await getRequest(URL + '/levels');
    lvlActual = localStorage.getItem('lvlActual');
    for (var i = 0; i < result.length; i++) {
        if (lvlActual == result[i].Name) {
                var deleted = document.getElementById('question6');
                deleted.remove();
                contador = 7;
                respuestaCorrecta = result[i].RespuestaCorrecta7;
                console.log("Lvl Actual = " + lvlActual + " Result = " + result[i].Name);

                let container = document.createElement('center');
                container.id = 'question7';
                document.body.appendChild(container);

                let titleQuiz = document.createElement('div');
                titleQuiz.className = 'text';

                let titleQuizText = document.createElement('p');
                titleQuizText.className = 'quizgg';
                titleQuizText.innerText = 'Quiz de ';
                titleQuiz.appendChild(titleQuizText);

                let spanName = document.createElement('span');
                spanName.className = 'GG';
                spanName.innerText = result[i].Name;
                titleQuizText.appendChild(spanName);
                container.appendChild(titleQuiz);

                let div_pregunta = document.createElement('div');
                div_pregunta.className = 'pregunta';

                let txt_pregunta = document.createElement('p');
                txt_pregunta.className = 'pregunta-text';
                txt_pregunta.innerText = result[i].Pregunta7;
                div_pregunta.appendChild(txt_pregunta);
                container.appendChild(div_pregunta);

                let div_container = document.createElement('div');
                div_container.className = 'container';

                let div_card = document.createElement('div');
                div_card.className = 'card';
                div_container.appendChild(div_card);

                let card_text = document.createElement('p');
                card_text.className = 'card-text';
                card_text.value = result[i].Respuesta7A;
                card_text.innerText = result[i].Respuesta7A;
                card_text.addEventListener("click", validate, false);
                div_card.appendChild(card_text);
                container.appendChild(div_container);

                let div_container2 = document.createElement('div');
                div_container2.className = 'container';

                let div_card2 = document.createElement('div');
                div_card2.className = 'card';
                div_container2.appendChild(div_card2);

                let card_text2 = document.createElement('p');
                card_text2.className = 'card-text';
                card_text2.value = result[i].Respuesta7B;
                card_text2.innerText = result[i].Respuesta7B;
                card_text2.addEventListener("click", validate, false);
                div_card2.appendChild(card_text2);
                container.appendChild(div_container2);

                let div_container3 = document.createElement('div');
                div_container3.className = 'container';

                let div_card3 = document.createElement('div');
                div_card3.className = 'card';
                div_container3.appendChild(div_card3);

                let card_text3 = document.createElement('p');
                card_text3.className = 'card-text';
                card_text3.value = result[i].Respuesta7C;
                card_text3.innerText = result[i].Respuesta7C;
                card_text3.addEventListener("click", validate, false);
                div_card3.appendChild(card_text3);
                container.appendChild(div_container3);

                let div_container4 = document.createElement('div');
                div_container4.className = 'container';

                let amodal = document.createElement ('a');
                amodal.setAttribute("data-bs-toggle", "modal");
                amodal.setAttribute("data-bs-target", "#exampleModal");
                div_container4.appendChild(amodal);

                let img_exit = document.createElement('img');
                img_exit.className = 'exit-';
                img_exit.src = "/src/static/img/logout2.png";
                amodal.appendChild(img_exit);
                container.appendChild(div_container4);

        }
    }
}

async function pregunta8(){
    const result = await getRequest(URL + '/levels');
    lvlActual = localStorage.getItem('lvlActual');
    for (var i = 0; i < result.length; i++) {
        if (lvlActual == result[i].Name) {
                var deleted = document.getElementById('question7');
                deleted.remove();
                contador = 8;
                respuestaCorrecta = result[i].RespuestaCorrecta8;
                console.log("Lvl Actual = " + lvlActual + " Result = " + result[i].Name);

                let container = document.createElement('center');
                container.id = 'question8';
                document.body.appendChild(container);

                let titleQuiz = document.createElement('div');
                titleQuiz.className = 'text';

                let titleQuizText = document.createElement('p');
                titleQuizText.className = 'quizgg';
                titleQuizText.innerText = 'Quiz de ';
                titleQuiz.appendChild(titleQuizText);

                let spanName = document.createElement('span');
                spanName.className = 'GG';
                spanName.innerText = result[i].Name;
                titleQuizText.appendChild(spanName);
                container.appendChild(titleQuiz);

                let div_pregunta = document.createElement('div');
                div_pregunta.className = 'pregunta';

                let txt_pregunta = document.createElement('p');
                txt_pregunta.className = 'pregunta-text';
                txt_pregunta.innerText = result[i].Pregunta8;
                div_pregunta.appendChild(txt_pregunta);
                container.appendChild(div_pregunta);

                let div_container = document.createElement('div');
                div_container.className = 'container';

                let div_card = document.createElement('div');
                div_card.className = 'card';
                div_container.appendChild(div_card);

                let card_text = document.createElement('p');
                card_text.className = 'card-text';
                card_text.value = result[i].Respuesta8A;
                card_text.innerText = result[i].Respuesta8A;
                card_text.addEventListener("click", validate, false);
                div_card.appendChild(card_text);
                container.appendChild(div_container);

                let div_container2 = document.createElement('div');
                div_container2.className = 'container';

                let div_card2 = document.createElement('div');
                div_card2.className = 'card';
                div_container2.appendChild(div_card2);

                let card_text2 = document.createElement('p');
                card_text2.className = 'card-text';
                card_text2.value = result[i].Respuesta8B;
                card_text2.innerText = result[i].Respuesta8B;
                card_text2.addEventListener("click", validate, false);
                div_card2.appendChild(card_text2);
                container.appendChild(div_container2);

                let div_container3 = document.createElement('div');
                div_container3.className = 'container';

                let div_card3 = document.createElement('div');
                div_card3.className = 'card';
                div_container3.appendChild(div_card3);

                let card_text3 = document.createElement('p');
                card_text3.className = 'card-text';
                card_text3.value = result[i].Respuesta8C;
                card_text3.innerText = result[i].Respuesta8C;
                card_text3.addEventListener("click", validate, false);
                div_card3.appendChild(card_text3);
                container.appendChild(div_container3);

                let div_container4 = document.createElement('div');
                div_container4.className = 'container';

                let amodal = document.createElement ('a');
                amodal.setAttribute("data-bs-toggle", "modal");
                amodal.setAttribute("data-bs-target", "#exampleModal");
                div_container4.appendChild(amodal);

                let img_exit = document.createElement('img');
                img_exit.className = 'exit-';
                img_exit.src = "/src/static/img/logout2.png";
                amodal.appendChild(img_exit);
                container.appendChild(div_container4);

        }
    }
}

async function pregunta9(){
    const result = await getRequest(URL + '/levels');
    lvlActual = localStorage.getItem('lvlActual');
    for (var i = 0; i < result.length; i++) {
        if (lvlActual == result[i].Name) {
                var deleted = document.getElementById('question8');
                deleted.remove();
                contador = 9;
                respuestaCorrecta = result[i].RespuestaCorrecta9;
                console.log("Lvl Actual = " + lvlActual + " Result = " + result[i].Name);

                let container = document.createElement('center');
                container.id = 'question9';
                document.body.appendChild(container);

                let titleQuiz = document.createElement('div');
                titleQuiz.className = 'text';

                let titleQuizText = document.createElement('p');
                titleQuizText.className = 'quizgg';
                titleQuizText.innerText = 'Quiz de ';
                titleQuiz.appendChild(titleQuizText);

                let spanName = document.createElement('span');
                spanName.className = 'GG';
                spanName.innerText = result[i].Name;
                titleQuizText.appendChild(spanName);
                container.appendChild(titleQuiz);

                let div_pregunta = document.createElement('div');
                div_pregunta.className = 'pregunta';

                let txt_pregunta = document.createElement('p');
                txt_pregunta.className = 'pregunta-text';
                txt_pregunta.innerText = result[i].Pregunta9;
                div_pregunta.appendChild(txt_pregunta);
                container.appendChild(div_pregunta);

                let div_container = document.createElement('div');
                div_container.className = 'container';

                let div_card = document.createElement('div');
                div_card.className = 'card';
                div_container.appendChild(div_card);

                let card_text = document.createElement('p');
                card_text.className = 'card-text';
                card_text.value = result[i].Respuesta9A;
                card_text.innerText = result[i].Respuesta9A;
                card_text.addEventListener("click", validate, false);
                div_card.appendChild(card_text);
                container.appendChild(div_container);

                let div_container2 = document.createElement('div');
                div_container2.className = 'container';

                let div_card2 = document.createElement('div');
                div_card2.className = 'card';
                div_container2.appendChild(div_card2);

                let card_text2 = document.createElement('p');
                card_text2.className = 'card-text';
                card_text2.value = result[i].Respuesta9B;
                card_text2.innerText = result[i].Respuesta9B;
                card_text2.addEventListener("click", validate, false);
                div_card2.appendChild(card_text2);
                container.appendChild(div_container2);

                let div_container3 = document.createElement('div');
                div_container3.className = 'container';

                let div_card3 = document.createElement('div');
                div_card3.className = 'card';
                div_container3.appendChild(div_card3);

                let card_text3 = document.createElement('p');
                card_text3.className = 'card-text';
                card_text3.value = result[i].Respuesta9C;
                card_text3.innerText = result[i].Respuesta9C;
                card_text3.addEventListener("click", validate, false);
                div_card3.appendChild(card_text3);
                container.appendChild(div_container3);

                let div_container4 = document.createElement('div');
                div_container4.className = 'container';

                let amodal = document.createElement ('a');
                amodal.setAttribute("data-bs-toggle", "modal");
                amodal.setAttribute("data-bs-target", "#exampleModal");
                div_container4.appendChild(amodal);

                let img_exit = document.createElement('img');
                img_exit.className = 'exit-';
                img_exit.src = "/src/static/img/logout2.png";
                amodal.appendChild(img_exit);
                container.appendChild(div_container4);

        }
    }
}

async function pregunta10(){
    const result = await getRequest(URL + '/levels');
    lvlActual = localStorage.getItem('lvlActual');
    for (var i = 0; i < result.length; i++) {
        if (lvlActual == result[i].Name) {
                var deleted = document.getElementById('question9');
                deleted.remove();
                contador = 10;
                respuestaCorrecta = result[i].RespuestaCorrecta10;
                console.log("Lvl Actual = " + lvlActual + " Result = " + result[i].Name);

                let container = document.createElement('center');
                container.id = 'question10';
                document.body.appendChild(container);

                let titleQuiz = document.createElement('div');
                titleQuiz.className = 'text';

                let titleQuizText = document.createElement('p');
                titleQuizText.className = 'quizgg';
                titleQuizText.innerText = 'Quiz de ';
                titleQuiz.appendChild(titleQuizText);

                let spanName = document.createElement('span');
                spanName.className = 'GG';
                spanName.innerText = result[i].Name;
                titleQuizText.appendChild(spanName);
                container.appendChild(titleQuiz);

                let div_pregunta = document.createElement('div');
                div_pregunta.className = 'pregunta';

                let txt_pregunta = document.createElement('p');
                txt_pregunta.className = 'pregunta-text';
                txt_pregunta.innerText = result[i].Pregunta10;
                div_pregunta.appendChild(txt_pregunta);
                container.appendChild(div_pregunta);

                let div_container = document.createElement('div');
                div_container.className = 'container';

                let div_card = document.createElement('div');
                div_card.className = 'card';
                div_container.appendChild(div_card);

                let card_text = document.createElement('p');
                card_text.className = 'card-text';
                card_text.value = result[i].Respuesta10A;
                card_text.innerText = result[i].Respuesta10A;
                card_text.addEventListener("click", validate, false);
                div_card.appendChild(card_text);
                container.appendChild(div_container);

                let div_container2 = document.createElement('div');
                div_container2.className = 'container';

                let div_card2 = document.createElement('div');
                div_card2.className = 'card';
                div_container2.appendChild(div_card2);

                let card_text2 = document.createElement('p');
                card_text2.className = 'card-text';
                card_text2.value = result[i].Respuesta10B;
                card_text2.innerText = result[i].Respuesta10B;
                card_text2.addEventListener("click", validate, false);
                div_card2.appendChild(card_text2);
                container.appendChild(div_container2);

                let div_container3 = document.createElement('div');
                div_container3.className = 'container';

                let div_card3 = document.createElement('div');
                div_card3.className = 'card';
                div_container3.appendChild(div_card3);

                let card_text3 = document.createElement('p');
                card_text3.className = 'card-text';
                card_text3.value = result[i].Respuesta10C;
                card_text3.innerText = result[i].Respuesta10C;
                card_text3.addEventListener("click", validate, false);
                div_card3.appendChild(card_text3);
                container.appendChild(div_container3);

                let div_container4 = document.createElement('div');
                div_container4.className = 'container';

                let amodal = document.createElement ('a');
                amodal.setAttribute("data-bs-toggle", "modal");
                amodal.setAttribute("data-bs-target", "#exampleModal");
                div_container4.appendChild(amodal);

                let img_exit = document.createElement('img');
                img_exit.className = 'exit-';
                img_exit.src = "/src/static/img/logout2.png";
                amodal.appendChild(img_exit);
                container.appendChild(div_container4);

        }
    }
}