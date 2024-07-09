// Simulador de compra para Pekitas Ecotienda

// Nombre y valor de los productos

// nombre: "Desodorante Solido", precio: 2000 ,
// nombre: "Balsamo Labial", precio: 3000 ,
// nombre: "Serúm Capilar", precio: 3500 ,
// nombre: "Jaón Natural", precio: 4000 ,
// nombre: "Mouse Corporal", precio: 4500 ,
// nombre: "Tonico Facial", precio: 5200 ,
// nombre: "Sales de Baño", precio: 7000 ,
// nombre: "Jabon Batido", precio: 8700 ,

// Saludos y obtención de nombre del usuario
function obtenerNombreCompleto() {
    console.log("Inicio de obtenerNombreCompleto");
    alert("¡Hola! Bienvenidos a Pekitas Ecotienda");
    let nombre = prompt("Ingrese su Nombre");
    while(nombre === "") {
        alert("Debe agregar un nombre");
        nombre = prompt("Ingrese su Nombre");
    }
    console.log("Nombre ingresado:", nombre);

    let apellido = prompt("Ingrese su Apellido");
    while(apellido === "") {
        alert("Debe agregar un apellido");
        apellido = prompt("Ingrese su Apellido");
    }
    console.log("Apellido ingresado:", apellido);

    alert(`Su nombre es ${nombre} ${apellido}`);
    console.log("Fin de obtenerNombreCompleto");
}

// Definición de productos y precios
let productos = [
    { nombre: "Desodorante Solido", precio: 2000 },
    { nombre: "Balsamo Labial", precio: 3000 },
    { nombre: "Serúm Capilar", precio: 3500 },
    { nombre: "Jaón Natural", precio: 4000 },
    { nombre: "Mouse Corporal", precio: 4500 },
    { nombre: "Tonico Facial", precio: 5200 },
    { nombre: "Sales de Baño", precio: 7000 },
    { nombre: "Jabon Batido", precio: 8700 },
];

// Función para mostrar los productos y obtener la elección del usuario
function seleccionarProducto() {
    console.log("Inicio de seleccionarProducto");
    let mensaje = "Qué producto desea adquirir?";
    for(let i = 0; i < productos.length; i++) {
        mensaje += `\n${i + 1}. ${productos[i].nombre} - $${productos[i].precio}`;
    }
    
    let compra = prompt(mensaje + "\n0. Finalizar compra");
    if(compra > 0 && compra <= productos.length) {
        let productoSeleccionado = productos[compra - 1];
        alert(`Producto: ${productoSeleccionado.nombre}\nPrecio: $${productoSeleccionado.precio}\nProducto agregado correctamente!`);
    }
    console.log("Producto seleccionado:", compra);
    return Number(compra);
}

// Función para calcular el total de la compra
function calcularTotalCompra(seleccion) {
    console.log("Inicio de calcularTotalCompra con selección:", seleccion);
    if (seleccion >= 1 && seleccion <= productos.length) {
        console.log("Precio del producto seleccionado:", productos[seleccion - 1].precio);
        return productos[seleccion - 1].precio;
    } else {
        alert("Opción no válida, intente de nuevo.");
        return 0;
    }
}

// Función para calcular descuentos y cuotas
function calcularDescuentosYCuotas(totalCompra) {
    console.log("Inicio de calcularDescuentosYCuotas con totalCompra:", totalCompra);
    let cuotas = 0;
    let descuento = 0;

    if(totalCompra >= 65000) {
        cuotas = 12;
        descuento = 15;
    } else if(totalCompra >= 50000) {
        cuotas = 12;
        descuento = 10;
    } else if(totalCompra >= 40000) {
        cuotas = 6;
        descuento = 10;
    } else if(totalCompra >= 30000) {
        cuotas = 6;
        descuento = 5;
    } else if(totalCompra >= 20000) {
        cuotas = 3;
        descuento = 5;
    } else if(totalCompra >= 15000) {
        cuotas = 3;
    } else {
        alert("No hay descuento ni cuotas disponibles para este monto.");
    }

    console.log(`Descuentos y cuotas calculados: ${descuento}% de descuento, ${cuotas} cuotas`);
    
    return { cuotas, descuento };
}

// Función de orden superior para aplicar descuentos
function aplicarDescuento(total, descuento) {
    return total - (total * descuento / 100);
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
    let cantidades = new Array(productos.length).fill(0);

    while(seguirComprando) {
        let seleccion = seleccionarProducto();
        
        if(seleccion === 0) {
            seguirComprando = false;
            console.log("Finalizar compra seleccionado");
        } else {
            totalCompra += calcularTotalCompra(seleccion);
            cantidades[seleccion - 1]++;
            alert(`Total acumulado de la compra: $${totalCompra}`);
            console.log("Total acumulado de la compra:", totalCompra);
        }
    }

    let { cuotas, descuento } = calcularDescuentosYCuotas(totalCompra);
    let montoFinal = aplicarDescuento(totalCompra, descuento);

    let resumenCompra = "Resumen de la compra:\n";
    for(let i = 0; i < productos.length; i++) {
        if(cantidades[i] > 0) {
            resumenCompra += `${productos[i].nombre}: ${cantidades[i]} unidad(es)\n`;
        }
    }
    resumenCompra += `\nTotal de la compra: $${totalCompra}\nDescuento: ${descuento}%\nTotal con descuento: $${montoFinal}\nCantidad de cuotas sin interés: ${cuotas}`;

    alert(resumenCompra);
    console.log("Resumen de la compra:", resumenCompra);
    
    console.log("Fin de realizarCompra");
}

// Iniciar la compra
realizarCompra();
