let datos;
let carrito;
const contenedor_categorias = document.getElementById('contenedor-categorias');
const contenedor_productos = document.getElementById('contenedor-productos');
const categoria_actual = document.getElementById('categoria-actual');

// Hacemos el fetch de los datos del JSON
let promise1 = fetch('https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json');
// Cuando termina el fetch, se ejecuta el código dentro del then del promise1 para ver si lo que salió está bien
let promise2 = promise1.then(function(resUrl){
    if (!resUrl.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        // Retornamos los valores convertidos en JSON
        console.log('Se cargaron los datos exitosamente y url: ',resUrl);
        return resUrl.json();
    }
});
// Ahora guardamos los datos en una variable global
let promise3 = promise2.then(function(resFinal){
    datos = resFinal;
    console.log("Se guardó exitosamente la variable datos: ", datos);
    return resFinal;
});
// Ahora llenamos la información del HTML con base en los datos
promise3.then(function(info){
    for(let i = 0; i < datos.length; i++){
        let categoria = document.createElement('div');
        categoria.className = 'col-1 categorias';
        let nodo = document.createTextNode(datos[i].name);
        categoria.appendChild(nodo);
        contenedor_categorias.appendChild(categoria);
        categoria.addEventListener('click',function(){
            categoria_actual.innerHTML = datos[i].name;
            contenedor_productos.innerHTML = '';
            for(let j = 0; j < datos[i].products.length; j++){
                contenedor_productos.appendChild(createCard(datos[i].products[j]));
            }
        });
    }
});
//Creamos la función para crear las tarjetas
let createCard = (pProducto) => {

    let columna = document.createElement('div');
    columna.className = 'col-3';

    let card = document.createElement('div');
    card.className = 'card h-100 shadow cursor-pointer';
    
    let image = document.createElement('img');
    image.className = 'card-img-top';
    image.src = pProducto.image;
    image.alt = 'Card image cap';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
  
    let title = document.createElement('h5');
    title.innerText = pProducto.name;
    title.className = 'card-title';
    
    let description = document.createElement('p');
    description.innerText = pProducto.description;
    description.className = 'card-text';
    
    let boton = document.createElement('a');
    boton.className = 'btn btn-primary'; 
    boton.innerText = 'Add to cart';
    
    let precio = document.createElement('h6');
    precio.classname = 'card-price';
    precio.innerText = '$'+ pProducto.price;

    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(precio);
    cardBody.appendChild(boton);
    card.appendChild(image);
    card.appendChild(cardBody);
    columna.appendChild(card);

    return columna;
  }

// Obtenemos los elementos que tienen como clase 'cat'
const categorias = document.getElementsByClassName('cat');
//Le ponemos el eventListener a las categorías para que pueda mostrar los productos
console.log('Las categorias son: ', categorias);
categoria_actual.addEventListener('change',function(){
    console.log("Cambio la categoria actual");
})

/*
categorias.addEventListener("click", function(){
    let paragraph = document.createElement('p');
    let nodo = document.createTextNode('Nuevo texto del parrafo')
    paragraph.appendChild(nodo);
    categorias.appendChild(paragraph);
});
*/