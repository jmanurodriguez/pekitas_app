// Simulador de compra para Pekitas Ecotienda

// Definición de productos y precios
let productos = [
    { nombre: "Desodorante Solido", precio: 2000 },
    { nombre: "Balsamo Labial", precio: 3000 },
    { nombre: "Serúm Capilar", precio: 3500 },
    { nombre: "Jabón Natural", precio: 4000 },
    { nombre: "Mouse Corporal", precio: 4500 },
    { nombre: "Tonico Facial", precio: 5200 },
    { nombre: "Sales de Baño", precio: 7000 },
    { nombre: "Jabon Batido", precio: 8700 },
];

// Función para capitalizar la primera letra de un nombre
function capitalizarPrimeraLetra(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// Función para mostrar un mensaje de bienvenida y obtener el nombre del usuario
function obtenerNombreCompleto() {
    console.log("Inicio de obtenerNombreCompleto");
    alert("¡Hola! Bienvenidos a Pekitas Ecotienda");
    let nombre = prompt("Ingrese su Nombre").trim();
    while (!nombre) {
        alert("Debe agregar un nombre");
        nombre = prompt("Ingrese su Nombre").trim();
    }

    let apellido = prompt("Ingrese su Apellido").trim();
    while (!apellido) {
        alert("Debe agregar un apellido");
        apellido = prompt("Ingrese su Apellido").trim();
    }

    nombre = capitalizarPrimeraLetra(nombre);
    apellido = capitalizarPrimeraLetra(apellido);

    alert(`Su nombre es ${nombre} ${apellido}`);
    console.log("Fin de obtenerNombreCompleto");
}

// Función para mostrar los productos y obtener la elección del usuario
function seleccionarProducto() {
    console.log("Inicio de seleccionarProducto");
    let mensaje = "Qué producto desea adquirir?\n" +
        productos.map((producto, i) => `${i + 1}. ${producto.nombre} - $${producto.precio}`).join('\n') +
        "\n0. Finalizar compra";
    
    let compra = parseInt(prompt(mensaje), 10);
    if (Number.isInteger(compra) && compra > 0 && compra <= productos.length) {
        let productoSeleccionado = productos[compra - 1];
        alert(`Producto: ${productoSeleccionado.nombre}\nPrecio: $${productoSeleccionado.precio}\nProducto agregado correctamente!`);
    } else if (compra !== 0) {
        alert("Opción no válida, intente de nuevo.");
    }
    console.log("Producto seleccionado:", compra);
    return compra;
}

// Función para calcular el total de la compra
function calcularTotalCompra(seleccion) {
    console.log("Inicio de calcularTotalCompra con selección:", seleccion);
    if (seleccion >= 1 && seleccion <= productos.length) {
        return productos[seleccion - 1].precio;
    }
    return 0;
}

// Función para calcular descuentos y cuotas
function calcularDescuentosYCuotas(totalCompra) {
    console.log("Inicio de calcularDescuentosYCuotas con totalCompra:", totalCompra);
    if (totalCompra >= 65000) return { cuotas: 12, descuento: 15 };
    if (totalCompra >= 50000) return { cuotas: 12, descuento: 10 };
    if (totalCompra >= 40000) return { cuotas: 6, descuento: 10 };
    if (totalCompra >= 30000) return { cuotas: 6, descuento: 5 };
    if (totalCompra >= 20000) return { cuotas: 3, descuento: 5 };
    if (totalCompra >= 15000) return { cuotas: 3, descuento: 0 };
    alert("No hay descuento ni cuotas disponibles para este monto.");
    return { cuotas: 0, descuento: 0 };
}

// Función de orden superior para aplicar descuentos
const aplicarDescuento = (total, descuento) => total - (total * descuento / 100);

// Función para mostrar los productos comprados y las cantidades
function mostrarResumenCompra(cantidades) {
    return productos.map((producto, i) => cantidades[i] > 0 ? `${i + 1}. ${producto.nombre}: ${cantidades[i]} unidad(es)` : '')
        .filter(linea => linea)
        .join('\n');
}

// Función principal que maneja el flujo de la compra
function realizarCompra() {
    console.log("Inicio de realizarCompra");
    
    obtenerNombreCompleto();
    
    alert(`En Pekitas Ecotienda tenemos diferentes descuentos para vos:\n
    - Si tu compra es igual o superior a $65000: 15% de descuento y 12 cuotas\n
    - Si tu compra es igual o superior a $50000: 10% de descuento y 12 cuotas\n
    - Si tu compra es igual o superior a $40000: 10% de descuento y 6 cuotas\n
    - Si tu compra es igual o superior a $30000: 5% de descuento y 6 cuotas\n
    - Si tu compra es igual o superior a $20000: 5% de descuento y 3 cuotas\n
    - Si tu compra es igual o superior a $15000: 3 cuotas\n
    - Si tu compra es menor a $15000: No tienes descuento ni cuotas disponibles`);

    let seguirComprando = true;
    let totalCompra = 0;
    let cantidades = Array(productos.length).fill(0);

    while (seguirComprando) {
        let seleccion = seleccionarProducto();
        
        if (seleccion === 0) {
            let confirmacion = prompt("¿Desea finalizar la compra? Tipee 'Si' para finalizar o 'No' para seguir agregando o borrar productos.");
            if (confirmacion && confirmacion.toLowerCase() === 'si') {
                seguirComprando = false;
            } else if (confirmacion && confirmacion.toLowerCase() === 'no') {
                let borrarProducto = prompt(`¿Qué producto desea borrar?\n${mostrarResumenCompra(cantidades)}\nIngrese el número del producto para borrarlo (Ej. 8 para Jabon Batido):`);
                borrarProducto = parseInt(borrarProducto, 10);
                if (Number.isInteger(borrarProducto) && borrarProducto > 0 && borrarProducto <= productos.length && cantidades[borrarProducto - 1] > 0) {
                    totalCompra -= productos[borrarProducto - 1].precio;
                    cantidades[borrarProducto - 1]--;
                    alert(`Producto ${productos[borrarProducto - 1].nombre} borrado correctamente.`);
                } else {
                    alert("Opción no válida o producto no encontrado.");
                }
            } else {
                alert("Opción no válida, intente de nuevo.");
            }
        } else {
            totalCompra += calcularTotalCompra(seleccion);
            cantidades[seleccion - 1]++;
            alert(`Total acumulado de la compra: $${totalCompra}`);
        }
    }

    let { cuotas, descuento } = calcularDescuentosYCuotas(totalCompra);
    let montoFinal = aplicarDescuento(totalCompra, descuento);

    let resumenCompra = `Resumen de la compra:\n${mostrarResumenCompra(cantidades)}\n\nTotal de la compra: $${totalCompra}\nDescuento: ${descuento}%\nTotal con descuento: $${montoFinal}\nCantidad de cuotas sin interés: ${cuotas}`;

    alert(resumenCompra);
    console.log("Resumen de la compra:", resumenCompra);
    
    console.log("Fin de realizarCompra");
}

// Iniciar la compra
realizarCompra();
