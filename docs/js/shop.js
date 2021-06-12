const URL = 'https://immense-cove-70793.herokuapp.com';
const URLc = 'https://immense-cove-70793.herokuapp.com/levels';
let nivelesList = [];
//VARIABLES PARA LA LOGICA DE CREAR LAS CARDS
let contador = 0;
let contador_card = 0;
let controlador = 0;
let div_container;
let resultLength = 0;
var lvlsDiponibles = [];
var tiendaVacia = false;

//LLAMADA A STRAPI
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



async function buy(){
    const result = await getRequest(URL + '/levels');
    //let lvlsDiponibles = localStorage.getItem('NivelesDisponibles');
    lvlsDiponibles = JSON.parse(localStorage.getItem("NivelesDisponibles"));
    let nivelSeleccionado = "";
    let a = 0;
    let b = 0;

    /*for (var i = 0; i < lvlsDiponibles.length; i++){
        if (lvlsDiponibles[i] != ","){
            if (lvlsDiponibles[i] == "["){
                a = i+1;
            }else if(lvlsDiponibles[i]== "]"){
                b = i;
                nivelSeleccionado = lvlsDiponibles.substring(a, b);
                nivelesList.push(nivelSeleccionado);
                console.log("Lista de niveles = "+nivelesList);
            }
        }
    }*/

    getShop();
}


async function getShop() {

    const result = await getRequest(URL + '/levels');
    document.getElementById('botonGenerar').className = 'hidden';

    for (let i = 0; i < result.length; i++) {
        console.log(result[i].Name)
        if (lvlsDiponibles.includes(result[i].Name)){
            controlador = controlador + 1;
            tiendaVacia = true;
            console.log("fiera = "+tiendaVacia)
        }else{
            console.log("dentro = "+tiendaVacia)
            tiendaVacia = false;
            if (contador < 2) {

                //CONTROLADOR CONTAINER
                if (contador == 0) {
                    div_container = document.createElement('div');
                }

                //SUMAMOS CONTADOR - CONTADOR_CARD - CONTROLADOR
                console.log("sumamos contadores");
                console.log("contador = " + contador);
                console.log("contador card = " + contador_card);
                contador = contador + 1;
                contador_card = contador_card + 1;
                controlador = controlador + 1;

                //CONTAINER
                div_container.className = 'container';

                //CARD
                let div_card = document.createElement('div');
                div_card.className = 'card';
                div_container.appendChild(div_card);

                //CARD HEADER
                let card_header = document.createElement('h5');
                card_header.className = 'card-header';
                card_header.innerText = result[i].Precio+' ';
                div_card.appendChild(card_header);

                //CARD HEADER CHILDS
                let img_header = document.createElement('img');
                img_header.className = 'coin';
                img_header.src = "static/img/dollar.png";
                card_header.appendChild(img_header);

                //VER DIFICULTAD
                let span_dificultad = document.createElement('span');

                if (result[i].Dificultad == 'Facil') {
                    span_dificultad.className = 'facil';
                } else if (result[i].Dificultad == 'Medio') {
                    span_dificultad.className = 'mid';
                } else {
                    span_dificultad.className = 'hard';
                }

                span_dificultad.innerText = result[i].Dificultad;
                card_header.appendChild(span_dificultad);

                //CARD BODY
                let card_body = document.createElement('div');
                card_body.className = 'card-body';
                div_card.appendChild(card_body);

                //CARD BODY CHILDS
                let card_title = document.createElement('h5');
                card_title.className = 'card-title';
                card_title.innerText = 'Quiz de ';
                card_body.appendChild(card_title);
                
                //SPAN DE CARD TITLE
                let span_title = document.createElement('span');
                span_title.className = 'GG';
                span_title.innerText = result[i].Name;
                card_title.appendChild(span_title);

                let card_text = document.createElement('p');
                card_text.className = 'card-text';
                card_text.innerText = result[i].Descripcion;
                card_body.appendChild(card_text);

                let unlock_button = document.createElement('a');
                unlock_button.value = result[i].Name;
                unlock_button.className = 'btn';
                unlock_button.setAttribute('name', result[i].Precio);
                unlock_button.addEventListener("click", comprar, false);
                unlock_button.id = 'btn-card';
                unlock_button.innerText = 'Unlock';
                card_body.appendChild(unlock_button);
                
                //IMAGEN BOTON CANDADO
                let unlock_img = document.createElement('img');
                unlock_img.className = 'lock-img';
                unlock_img.src = '/src/static/img/padlock.png';
                unlock_button.appendChild(unlock_img);

                //SI HAY DOS CARTAS EN EL DIV_CONTAINER SE INSERTA EN EL BODY
                if (contador == 2 && contador_card == 2) {

                    //AÑADIR AL BODY EL CONTAINER
                    document.body.appendChild(div_container);

                    //RESETEAMOS LOS CONTADORES
                    contador = 0;
                    contador_card = 0;

                    //SI SE QUEDA UNA CARTA SUELTA EN EL CONTAINER SE AÑADE AL BODY
                } else if (contador == 1 && contador_card == 1) {

                    //AÑADIR AL BODY EL CONTAINER
                    document.body.appendChild(div_container);

                    //RESETEAMOS EL CONTADOR
                    contador = 0;
                    contador_card = 0;
                }
            }
        }
    }
}

function comprar(){
        var presio = this.name;
        console.log(presio+" xd");

        var dineroActual = parseInt(localStorage.getItem('coins'));

        if( dineroActual >= presio){
            var newLevel = this.value;
            lvlsDiponibles.push(newLevel);
            console.log("levels = "+lvlsDiponibles);
            localStorage.setItem("NivelesDisponibles", JSON.stringify(lvlsDiponibles));
            dineroActual = dineroActual - presio;
            localStorage.setItem('coins', dineroActual);
            location.reload();
        }else{
            alert("No tienes dinero suficiente para comprar este nivel");
        }
    }

        


