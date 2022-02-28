
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

const registrosPorPagina = 40;
let totalPaginas;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario (e) { 
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        mostarAlerta('agrega un termino de busqueda');
        return;
    }

    buscarImagenes(terminoBusqueda);

}

function mostarAlerta( mensaje ) {

    const existeAlerta = document.querySelector('.existeAlerta');

    if (!existeAlerta) {

        const alerta = document.createElement('P');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'existeAlerta');
    
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${mensaje}</span>
        `
    
        formulario.appendChild(alerta);
    
        setTimeout(() => {
            alerta.remove();
        }, 3000);

    }


}

function buscarImagenes(termino){
    const key = '25914404-864d61f09b8f19f06954aec3b';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=100`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            totalPaginas = calulcarPaginas(resultado.totalHits)
            mostrarImagenes(resultado.hits)
        })
}

function calulcarPaginas(total) {
    return parseInt( Math.ceil( total / registrosPorPagina ) )
}

function mostrarImagenes(imagenes) {
   
    console.log(imagenes);

    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    //! iterar sobre arreglo de imagenes y construir el html
    imagenes.forEach( imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
            <img class="w-full" src="${previewURL}">

                <div class="p-4">
                    <p class="font-bold"> ${likes}<span class="font-light"> Me gusta</span></p>
                    <p class="font-bold"> ${views}<span class="font-light"> Veces vista</span></p>

                    <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                    Ver Imagen
                    </a>
                </div>
            </div>
        </div>
        `

    })

    

}