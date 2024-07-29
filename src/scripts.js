const hotels = [
    {
        category: 'economico',
        name: 'Lakewood',
        imagen: 'Lakewood.jpg',
        prices: {
            cost_regular: [110,90],
            cost_premium: [80,80]
        }
    },
    {
        category: 'estandar',
        name: 'Bridgewood',
        imagen: 'Bridgewood.jpg',
        prices: {
            cost_regular: [160,60],
            cost_premium: [110,50]
        }
    },
    {
        category: 'lujo',
        name: 'Ridgewood',
        imagen: 'Ridgewood.jpeg',
        prices: {
            cost_regular: [220,150],
            cost_premium: [100,40]
        }
    }
];

window.onload = function() {
    let today = new Date();
    document.getElementById('start-date').valueAsDate = today;
    today.setDate(today.getDate() + 1);
    document.getElementById('end-date').valueAsDate = today;
}

let checkbox = document.getElementById('checkbox');
let precios = document.querySelectorAll('.precio');
let regular = document.querySelector('.regular');
let premium = document.querySelector('.premium');
let search = document.getElementById('search');
let divCardResult = document.getElementById('results');
let optionPlan = 'regular';

checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        regular.style.color = '#6c7687cb';
        premium.style.color = '#000';
        optionPlan = 'premium';

        let preciosPremium = [];
        precios.forEach(precio => {
            preciosPremium.push(precio);
        })
        preciosPremium[0].innerText = 80;
        preciosPremium[1].innerText = 80;
        preciosPremium[2].innerText = 110;
        preciosPremium[3].innerText = 50;
        preciosPremium[4].innerText = 100;
        preciosPremium[5].innerText = 40;

    } else {
        regular.style.color = '#000';
        premium.style.color = '#6c7687cb';
        optionPlan = 'regular';

        let preciosRegular = [];
        precios.forEach(precio => {
            preciosRegular.push(precio);
        })
        preciosRegular[0].innerText = 110;
        preciosRegular[1].innerText = 90;
        preciosRegular[2].innerText = 160;
        preciosRegular[3].innerText = 60;
        preciosRegular[4].innerText = 220;
        preciosRegular[5].innerText = 150;
    }
})


search.addEventListener('click', function(event) {

    event.preventDefault()

    /* Tomo las informacion de las cajas para procesar la informacion */
    const checkin = new Date(document.getElementById('start-date').value);
    const checkout = new Date(document.getElementById('end-date').value);
    const guests = document.getElementById('users_count').value;

    /* Validar la cantidad de dias y el tipo de dia seleccionado */
    let costs = [];
    let count_days = 0;

    while(checkout.getTime() >= checkin.getTime()){  
        count_days = count_days + 1;  
        checkin.setDate(checkin.getDate() + 1)
        date_evaluate = new Date(checkin.getDay().toLocaleString()).getDay();

        for (let index = 0; index < 3; index++) {
            let element = hotels[index];
            let cost_per_night = 0;
         
            /* Verifico que tipo de plan se ha seleccionado */
            if (optionPlan == 'regular'){
                /* Verifico que dia de la semana se ha elegido: Fin de semana o dia de la semana */
                if (date_evaluate == 5 || date_evaluate == 6) {
                    cost_per_night = (isNaN(costs[index]) ? 0 : costs[index]) + element.prices.cost_regular[1];
                    /* console.log(cost_per_night); */
                } else {
                    cost_per_night = (isNaN(costs[index]) ? 0 : costs[index]) + element.prices.cost_regular[0];
                    /* console.log(cost_per_night); */
                } 
                costs[index] = cost_per_night;
            } else {
                if (date_evaluate == 5 || date_evaluate == 6) {
                    cost_per_night = (isNaN(costs[index]) ? 0 : costs[index]) + element.prices.cost_premium[1];
                    /* console.log(cost_per_night); */
                } else {
                    cost_per_night = (isNaN(costs[index]) ? 0 : costs[index]) + element.prices.cost_premium[0];
                    /* console.log(cost_per_night); */
                } 
                costs[index] = cost_per_night;
            }
        }
    }

    let element = costs[0];
    let index_result = 0; 

    for (let index = 1; index < costs.length; index++) {
        if (element == costs[index]) {
            /* Valido la calificacion del hotel en base a su index */
            if (index_result < index) {
                element = costs[index];
                index_result = index;
            }
        } else {
            /* Valido el costo del hospedaje */
            if (element > costs[index]) {
                element = costs[index];
                index_result = index;
            }
        }
    }

    /* Presentar la mejor opcion de hotel */
    addCardResult(index_result, (element * guests), count_days, guests);

    /* console.log('La mejor opcion es ' + hotels[0].name + ' el valor total es: $ ' + element); */
})

/* Funcion que permite agregar la tarjeta del hotel seleccionado como la opcion mas barata */
function addCardResult(index, cost_tot, count_days, guests) {
    const cardExtras = document.querySelector(".card__container-extras")
    let htmlCode = '<h2> Hotel ' + hotels[index].name + '</h2><img src="./img/' + hotels[index].imagen + '" alt=""><span> Valor Total $ ' +  cost_tot + ' por ' + count_days +' dias ' + guests +' personas.</span>';
    cardExtras.innerHTML = htmlCode;
}
