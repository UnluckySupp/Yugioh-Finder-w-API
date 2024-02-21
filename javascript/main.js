//Variables Header
//Variables Filtros

//Variables Galeria
const cartasPorPagina = 36;
let paginaActual = 0;
let dataCartas;
let dataCartasFiltradas;
//variables para funciones
let url = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
//variables del DOM
const filtrarPorTexto = document.getElementById("filtrarObjeto");
let ascendent = document.getElementById("ascendent");
let descendent = document.getElementById("descendent");
let filtros = document.getElementById("filtros");
let filtrosPorTipo= document.querySelectorAll(".filtrosPorTipo");
let galeriaCartas = document.getElementById("galeriaCartas");
let buttonAtras2 = document.getElementById("buttonAtras2");
let buttonAtras1 = document.getElementById("buttonAtras1");
let buttonPaginaActual = document.getElementById("paginaActual");
let buttonAdelante1 = document.getElementById("buttonAdelante1");
let buttonAdelante2 = document.getElementById("buttonAdelante2");
let body = document.getElementById("body");
let label=document.getElementById("label")
let input=document.getElementById("input")

//Funciones

//FuncionesHeader

const filtrarAscendent = (array) =>{
    dataCartasFiltradas = array.sort((a,b)=>{
        if(a.name < b.name){
            return -1;
        }else if(b.name < a.name){
            return 1;
        }else{
            return 0;
        }
    });
    filtrosBotones();
    renderizarCartas(dataCartasFiltradas);
};

const filtrarDescendent = (array) =>{
    dataCartasFiltradas = array.sort((a,b) =>{
        if(a.name > b.name){
            return -1;
        }else if(b.name > a.name){
            return 1;
        }else{
            return 0;
        }
    });
    filtrosBotones();
    renderizarCartas(dataCartasFiltradas);
};

filtrarPorTexto.addEventListener("keyup", (e) => {
    const textoFiltrado = e.target.value.trim().toLowerCase(); // Eliminar espacios en blanco al principio y al final
    const expresionRegular = new RegExp(textoFiltrado.replace(/[^a-zA-Z\d\s.l]/g, ''), 'i'); // Crear expresión regular ignorando caracteres no alfabéticos

    const cartasFiltradasPorTexto = dataCartas.filter((carta) => expresionRegular.test(carta.name.toLowerCase()));

    dataCartasFiltradas = cartasFiltradasPorTexto;
    renderizarCartas(dataCartasFiltradas);

    if (e.target.value === "") {
        dataCartasFiltradas = dataCartas;
    } else if (e.target.value !== "") {
        galeriaCartas.innerHTML = "";
        renderizarCartas(dataCartasFiltradas);
    };
});

//Funciones Filtros
const filtrosBotones = () =>{
    let filtrosDeLetras = document.createElement("div")
    filtrosDeLetras.classList.add("filtroDeLetras");
    filtrosDeLetras.innerHTML=``;
    for(let letra = 65; letra <= 90; letra++){
        const letraActual = String.fromCharCode(letra);
        const botonLetra = document.createElement("button");
        botonLetra.classList.add("buttonFiltros");
        botonLetra.textContent = letraActual;
        botonLetra.id = `${letraActual}`;
        filtrosDeLetras.append(botonLetra);
        botonLetra.addEventListener("click", (event)=>{
            const inicial = event.target.id;
            filtrarPorInicial(dataCartasFiltradas, inicial);
            renderizarCartas(dataCartasFiltradas);
        });
    filtros.append(filtrosDeLetras);
    };
};

const filtrarPorInicial = (array , letra) =>{
    dataCartasFiltradas = array.filter(carta => carta.name.charAt(0).toUpperCase() === letra);
    return dataCartasFiltradas;
};

const filtradoPorTipo = (event) =>{
    let typeButton = event.target.id;
    dataCartasFiltradas = dataCartas.filter(carta => carta.type.includes(typeButton));
    if(dataCartasFiltradas.length > 0){
        renderizarCartas(dataCartasFiltradas);
    }else{
        renderizarCartas(dataCartas);
    }
}

//Funciones Galeria
function toPascalCase(str) {
    return str.replace(/(\w)(\w*)/g, function (_, first, rest) {
        return first.toUpperCase() + rest.toLowerCase();
    });
};

const renderizarCartas = (data) => {
    galeriaCartas.innerHTML = "";
    let inicio = paginaActual * cartasPorPagina;
    let fin = inicio + cartasPorPagina;
    let cartasSeccionadas = data.slice(inicio, fin);

    cartasSeccionadas.forEach(item => {
        let carta = document.createElement("div");
        carta.classList.add("cartaGaleriaCartas");
        carta.innerHTML = `
    <img class="imagenCarta" src=${item.card_images[0].image_url_small} alt="${item.name}">
    `
        galeriaCartas.append(carta);

        carta.addEventListener("click", () => {
            ventanaEmergente(item);   
        });
    });
};

const ventanaEmergente = (item) => {
    let ventanaData = document.createElement("div");
        ventanaData.classList.add("emergente");
    let typoPascal = toPascalCase(item.frameType);
    if (item.type.includes("Monster")) {
        ventanaData.innerHTML = `
        <button id="boton${item.id}" class="botonImagenDetallada">Ver Imagen detallada</button>
        <button class="botonCerrar">Cerrar</button>
        <div class="contenedorEmergente">
        <div class="imagenGrande">
          <div class="nombreYTipo">
            <p class="texto">${item.name}</p>
            <p class="texto">${item.attribute}</p>
          </div>
          <div class="attackYDeff">
          <p class="texto poderTexto">Power: ${item.level}</p>
          <p class="texto atk">ATK: ${item.atk}</p>
            <p class="texto defensa">DEF: ${item.def}</p>
          </div>
          <div class="descripcion">
          <p class="texto">${item.race}/${item.type}</p>
          <p class="texto">${item.desc}</p>
          </div>
          <button class="verImagen">Ver Imagen</button>
          </div>
          <div class="cartaDetallada">
          <img src=${item.card_images[0].image_url} alt="${item.name}">
          </div>
          </div>
          `;
    } else if (item.type.includes("Spell")) {
        ventanaData.innerHTML = `
          <button id="boton${item.id}" class="botonImagenDetallada">Ver Imagen detallada</button>
          <button class="botonCerrar">Cerrar</button>
          <div class="contenedorEmergente">
          <div class="imagenGrande">
          <div class="nombreYTipo">
          <p class="texto">${item.name}</p>
          <p class="texto">${typoPascal}</p>
          </div>
          <div class="attackYDeff">
          <p class=texto>${item.race}</p>
          <p class="texto spellTrap">${item.type}</p>
          </div>
          <div class="descripcion">
          <p class="texto">${item.desc}</p>
          </div>
          <button class="verImagen">Ver Imagen</button>
          </div>
          <div class="cartaDetallada">
          <img src=${item.card_images[0].image_url} alt="${item.name}">
          </div>
          </div>`;
    } else if (item.type.includes("Trap")) {
        ventanaData.innerHTML = `
          <button id="boton${item.id}" class="botonImagenDetallada">Ver Imagen detallada</button>
          <button class="botonCerrar">Cerrar</button>
          <div class="contenedorEmergente">
          <div class="imagenGrande">
          <div class="nombreYTipo">
          <p class="texto">${item.name}</p>
          <p class="texto">${typoPascal}</p>
          </div>
          <div class="attackYDeff">
          <p class=texto>${item.race}</p>
          <p class="texto spellTrap">${item.type}</p>
          </div>
          <div class="descripcion">
          <p class="texto">${item.desc}</p>
          </div>
          <button class="verImagen">Ver Imagen</button>
          </div>
          <div class="cartaDetallada">
          <img src=${item.card_images[0].image_url} alt="${item.name}">
          </div>
          </div>`;
    } else {
        ventanaData.innerHTML = `
          <button id="boton${item.id}" class="botonImagenDetallada">Ver Imagen detallada</button>
          <button class="botonCerrar">Cerrar</button>
          <div class="contenedorEmergente">
          <div class="imagenGrande">
          <div class="nombreYTipo">
          <p class="texto">${item.name}</p>
          <p class="texto">${typoPascal}</p>
          </div>
          <div class="attackYDeff">
          <p class=texto>${item.race}</p>
          <p class="texto spellTrap">${item.type}</p>
          </div>
          <div class="descripcion">
          <p class="texto">${item.desc}</p>
          </div>
          <button class="verImagen">Ver Imagen</button>
          </div>
          <div class="cartaDetallada">
          <img src=${item.card_images[0].image_url} alt="${item.name}">
          </div>
          </div>`;
    };
    ventanaData.querySelector('.imagenGrande').style.backgroundImage = `url(${item.card_images[0].image_url_cropped})`;
        if (item.type === "Skill Card") {
            ventanaData.querySelector('.imagenGrande').style.backgroundImage = `url()`;
    };
    body.append(ventanaData);

    let botonCerrar = ventanaData.querySelector(".botonCerrar");
        botonCerrar.addEventListener("click", () => {
            ventanaData.classList.add("emergenteOculto");
        });
    document.addEventListener("keydown",(event) => {
        if (event.key === "Escape") {
            ventanaData.classList.add("emergenteOculto");
        }
    });
    let boton = ventanaData.querySelector(`#boton${item.id}`);
        boton.addEventListener("click", () => {
         ventanaData.querySelector(".imagenGrande").classList.add("imagenGrandeVisible");
    });
    let verImagen = ventanaData.querySelector(".verImagen");
        verImagen.addEventListener("click", () => {
         const estilos = ventanaData.querySelectorAll(".nombreYTipo, .attackYDeff, .spellTrap, .descripcion, .texto");
            estilos.forEach(clase => {
                if (clase.classList.contains("ocultar")) {
                    clase.classList.remove("ocultar");
                } else {
                    clase.classList.add("ocultar");
                }
        });
    });
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
ascendent.addEventListener("click", ()=>{
    filtrarAscendent(dataCartas);
});

descendent.addEventListener("click", ()=>{
    filtrarDescendent(dataCartas);
})

document.addEventListener('DOMContentLoaded',() =>{
    filtrarPorTexto.addEventListener('focus',() =>{
        label.classList.add('labelShifted');
        filtrarPorTexto.classList.add("inputShifted");
    });

    filtrarPorTexto.addEventListener('blur',() =>{
        if (filtrarPorTexto.value === '') {
            label.classList.remove('labelShifted');
            filtrarPorTexto.classList.remove("inputShifted");
        }
    });
});
//Filtros
filtrosBotones();
filtrosPorTipo.forEach(button =>{   
    button.addEventListener("click", (event)=>{
        filtradoPorTipo(event);
    });
})
//Galeria

fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
        dataCartas = responseData.data;
        dataCartasFiltradas=dataCartas;
        renderizarCartas(dataCartas);
        actualizacionBotones(dataCartas);
    });

buttonAtras2.addEventListener("click", () => {
    paginaActual -= 2;
    renderizarCartas(dataCartasFiltradas);
    actualizacionBotones(dataCartasFiltradas);
});

buttonAtras1.addEventListener("click", () => {
    paginaActual--;
    renderizarCartas(dataCartasFiltradas);
    actualizacionBotones(dataCartasFiltradas);
});

buttonAdelante1.addEventListener("click", () => {
    paginaActual++;
    renderizarCartas(dataCartasFiltradas);
    actualizacionBotones(dataCartasFiltradas);
});

buttonAdelante2.addEventListener("click", () => {
    paginaActual += 2;
    renderizarCartas(dataCartasFiltradas);
    actualizacionBotones(dataCartasFiltradas);
});


