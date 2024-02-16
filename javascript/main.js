//Variables Header

//Variables Filtros


//Variables Galeria
//variables para funciones
let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
const cartasPorPagina = 36;
let paginaActual = 0;
let dataCartas;
//variables del DOM
let galeriaCartas = document.getElementById("galeriaCartas");
let buttonAtras2 = document.getElementById("buttonAtras2");
let buttonAtras1 = document.getElementById("buttonAtras1");
let buttonPaginaActual =document.getElementById("paginaActual");
let buttonAdelante1 = document.getElementById("buttonAdelante1");
let buttonAdelante2 = document.getElementById("buttonAdelante2");

//Funciones

//FuncionesHeader

//FuncionesFiltros

//Funciones Galeria
const renderizarCartas = (data) => {
    galeriaCartas.innerHTML = "";
    let inicio = paginaActual * cartasPorPagina;
    let fin = inicio + cartasPorPagina;
    let cartasSeccionadas = data.slice(inicio, fin);
    
    cartasSeccionadas.forEach(item =>{
    let carta = document.createElement("div");
    carta.classList.add("cartaGaleriaCartas");
    carta.innerHTML=`
    <img src=${item.card_images[0].image_url_small} alt="${item.name}">
    `
     galeriaCartas.append(carta);
    })
 };

 const actualizacionBotones = (data) => {
    buttonPaginaActual.textContent = paginaActual + 1;
    buttonAtras2.disabled = (paginaActual < 2);
    buttonAtras1.disabled = (paginaActual < 1);
    buttonAdelante1.disabled = (paginaActual > Math.ceil(data.length / cartasPorPagina) - 2);
    buttonAdelante2.disabled = (paginaActual > Math.ceil(data.length / cartasPorPagina) - 3);
    
    //renderizado de contenido de botones
    buttonPaginaActual.textContent = paginaActual + 1;
    if (paginaActual < 2) {
        buttonAtras2.textContent = `no hay más páginas`;
    } else {
        buttonAtras2.textContent = paginaActual - 1;
    }
    
    if (paginaActual < 1) {
        buttonAtras1.textContent = `no hay más páginas`;
    } else {
        buttonAtras1.textContent = paginaActual;
    }
    
    if (paginaActual >= Math.ceil(data.length / cartasPorPagina) - 1) {
        buttonAdelante1.textContent = `no hay más páginas`;
    } else {
        buttonAdelante1.textContent = paginaActual + 2;
    }
    
    if (paginaActual >= Math.ceil(data.length / cartasPorPagina) - 2) {
        buttonAdelante2.textContent = `no hay más páginas`;
    } else {
        buttonAdelante2.textContent = paginaActual + 3;
    }
};

//Header

//Filtros

 //Galeria

fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
        dataCartas = responseData.data;
        console.log(responseData);
        console.log(dataCartas);
        renderizarCartas(dataCartas);
        actualizacionBotones(dataCartas);
    });
        
buttonAtras2.addEventListener("click", ()=>{
    paginaActual-=2;
    renderizarCartas(dataCartas);
    actualizacionBotones(dataCartas);
});
    
buttonAtras1.addEventListener("click", ()=>{
    paginaActual--;
    renderizarCartas(dataCartas);
    actualizacionBotones(dataCartas);
});
    
buttonAdelante1.addEventListener("click", ()=>{
    paginaActual++;
    renderizarCartas(dataCartas);
    actualizacionBotones(dataCartas);
});
    
buttonAdelante2.addEventListener("click", ()=>{
    paginaActual+=2;
    renderizarCartas(dataCartas);
    actualizacionBotones(dataCartas);
    console.log(paginaActual)
});
