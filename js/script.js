const $ = (selector) => document.querySelector(selector);
const formulario = $("form");
const articulo = $("#articulo");


formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    const datos = new FormData(formulario);
    const products = datos.get("products");

    const numero = Number(products);
    if (isNaN(numero) || numero < 1 || numero > 20) {
        alert("ERROR; ingresa un número entre 1 y 20.");
        return;
    }

    const peticion = await fetch(`${formulario.action}/${products}`);
    


    const resultado = await peticion.json();
   
    const productos = `<article class="border border-fuchsia-200 rounded-xl flex flex-col">
                    <h1 class="px-4 p-4 text-center text-lg"><strong class="text-balance">ID-${resultado.id}:</strong> ${resultado.title}</h1>
                    <figure class="px-4"><img class="p-2 hover:scale-125 w-60 h-60" src='${resultado.image}' alt="${resultado.title}"></figure>
                    <div class="bg-white text-fuchsia-900 p-2 w-full h-full rounded-b-xl text-center" id="centro">
                        <div><strong>Description:</strong> <span class="text-sm">${resultado.description}</span></div>
                        <div><strong>Category:</strong> <span class="text-base">${resultado.category}</span></div>
                        <div><strong>Price:</strong> <span class="text-2xl">${resultado.price}</span></div>
                    </div>
                </article>`


        articulo.insertAdjacentHTML("beforeend", productos)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
       });
});