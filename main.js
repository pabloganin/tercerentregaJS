//Creamos productos

class producto {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
  }
}
const hel123b = new producto(
  1,
  "Heladera 12 / 24 V 123L",
  126000,
  "./img/heladera125b.png"
);
const hel123r = new producto(
  2,
  "Heladera 12 / 24 V 123L",
  125000,
  "./img/heladera125r.png"
);
const hel257b = new producto(
  3,
  "Heladera 12 / 24 V 257L",
  160000,
  "./img/heladera257b.png"
);
const free224l = new producto(
  4,
  "Freezer 12 / 24 V 224L",
  150000,
  "./img/freezer224.png"
);
const regulador = new producto(
  5,
  "Regulador PWM",
  16000,
  "./img/regulador (2).png"
);
const panel260 = new producto(6, "Panel 260W", 30000, "./img/panel.png");
const bateria190 = new producto(7, "Bateria 190ah", 95000, "./img/bateria.png");
const kit = new producto(
  8,
  "Kit Solar para Heladera",
  180000,
  "./img/kitsolar.png"
);

//Array Carrito
const productos = [
  hel123b,
  hel123r,
  hel257b,
  free224l,
  regulador,
  panel260,
  bateria190,
  kit
];

let carrito = [];

//localStorage

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

//DOM getElementById y agregado de productos

const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () => {
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
<div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text">Precio $ ${producto.precio} </p>
                <button class="btn btn-primary"  id="boton${producto.id}"> Agregar </button>
               
                </div>
            </div>
        `;
    contenedorProductos.appendChild(card);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
};

const agregarAlCarrito = (id) => {
  const producto = productos.find((producto) => producto.id === id);
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push(producto);

    //Se guarda carrito localStorage JSON
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  calcularTotal();
};

mostrarProductos();

const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
});

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-5", "col-xs-12");
    card.innerHTML = `
            <div class="card">
                <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <p class="card-text"> ${producto.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                </div>
            </div>
        `;
    contenedorCarrito.appendChild(card);

    //Eliminar
    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    });
  });
  calcularTotal();
};

const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  mostrarCarrito();

  //LocalStorage:
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
  eliminarTodoElCarrito();
});

const eliminarTodoElCarrito = () => {
  carrito = [];
  mostrarCarrito();

  //LocalStorage.
  localStorage.clear();
};

//getElementById Total Compra

const total = document.getElementById("total");

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad;
  });
  total.innerHTML = `Total: $${totalCompra}`;
};
