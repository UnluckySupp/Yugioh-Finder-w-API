import {url} from "./variables.js";
import {renderizarCartas} from "./funciones.js";

fetch(url)
    .then((response) => response.json())
    .then((data) => renderizarCartas(data.data))


