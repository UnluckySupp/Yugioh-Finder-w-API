import {url} from "./variables.js"

fetch(url)
    .then((response) => response.json())
    .then((data) => mostrarData(data.data))

const mostrarData = (data) =>{
    console.log(data);
}
