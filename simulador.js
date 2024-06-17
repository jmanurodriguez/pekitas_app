//Simulador de compra para Pekitas Ecotienda

// Nombre y valor de los productos

    //  nombre: "Desodorante Solido", precio: 2000 ,
    // nombre: "Balsamo Labial", precio: 3000 ,
    //  nombre: "Serúm Capilar", precio: 3500 ,
    //  nombre: "Jaón Natural", precio: 4000 ,
    //  nombre: "Mouse Corporal", precio: 4500 ,
    //  nombre: "Tonico Facial", precio: 5200 ,
    // nombre: "Sales de Baño", precio: 7000 ,
    // nombre: "Jabon Batido", precio: 8700 ,


    //El simulador nos va a dar diferentes descuentos y cuotas dependiendo en monto que gastemos
    //     Compra Total >= 65000
    //     cuotas = 12
    //     descuento = 15
    //     Compra Total >= 50000
    //     cuotas = 12;
    //     descuento = 10
    //     Compra TTotal>= 40000 
    //     cuotas = 6;
    //     descuento = 10;
    //     Compra Total >= 30000
    //     cuotas = 6;
    //     descuento = 5;
    //     Compra Total >= 20000
    //     cuotas = 3;
    //     descuento = 5;
    //     Compra Total >= 15000
    //     cuotas = 3;
    //     Compra Total inferior a 15000
    //     No hay descuento ni cuotas disponibles para este monto.
// Función para ingresar nombre, apellido y recibir saludo
    function obtenerNombreCompleto() {
        console.log("Inicio de obtenerNombreCompleto");
        alert("¡Hola! Bienvenidos a Pekitas Ecotienda");
        let nombre = prompt("Ingrese su Nombre");
        while(nombre === "") {
            alert("Debe agregar un nombre");
            nombre = prompt("Ingrese su Nombre");
        }
        nombre = nombre.toUpperCase();
        console.log("Nombre ingresado:", nombre);
    
        let apellido = prompt("Ingrese su Apellido");
        while(apellido === "") {
            alert("Debe agregar un apellido");
            apellido = prompt("Ingrese su Apellido");
        }
        apellido = apellido.toUpperCase();
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
        mensaje += `\n${i + 1}. ${productos[i].nombre}`;
    }
    
    let compra = prompt(mensaje + "\n0. Finalizar compra");
    if(compra > 0 && compra <= productos.length) {
        alert("Producto agregado correctamente!");
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

// Función para calcular el total de las cuotas
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


// Función principal que maneja el flujo de la compra
function realizarCompra() {
    console.log("Inicio de realizarCompra");
    
    obtenerNombreCompleto();
    
    let seguirComprando = true;
    let totalCompra = 0;

    while(seguirComprando) {
        let seleccion = seleccionarProducto();
        
        if(seleccion === 0) {
            seguirComprando = false;
            console.log("Finalizar compra seleccionado");
        } else {
            totalCompra += calcularTotalCompra(seleccion);
            console.log("Total acumulado de la compra:", totalCompra);
        }
        
        if(!seguirComprando) {
            let { cuotas, descuento } = calcularDescuentosYCuotas(totalCompra);
            let montoFinal = totalCompra - (totalCompra * descuento / 100);
            alert(`Total de la compra: $${totalCompra}\nDescuento: ${descuento}%\nTotal con descuento: $${montoFinal}\nCantidad de cuotas sin interés: ${cuotas}`);
            console.log(`Resultados finales: Total de la compra: $${totalCompra}, Descuento aplicado: ${descuento}%, Total con descuento: $${montoFinal}, Cuotas: ${cuotas}`);
        }
    }
    console.log("Fin de realizarCompra");
}

// Iniciar la compra
realizarCompra();