const evaluacion = [];

const ordenarMenorMayor = () => {
    prestamos.sort((a, b) => a.valor - b.valor)
    mostrarListaOrdenada()
};

const ordenarMayorMenor = () => {
    prestamos.sort((a, b) => b.valor - a.valor)
    mostrarListaOrdenada()
};

const mostrarListaOrdenada = () => {
    const listaOrdenada = prestamos.map(prestamo => {
        return '- '+prestamo.nombre+': $'+prestamo.valor+' por '+prestamo.meses+' meses al '+prestamo.interes+'% de interés'
    });
    alert('Lista de préstamos disponibles:'+'\n\n'+listaOrdenada.join('\n'));
    solicitarPrestamo(listaOrdenada);
};

const solicitarPrestamo = (listaDePrestamos) => {
    let otraEvaluacion;
    let prestamoNombre = '';
    let prestamoCantidad = 0;

    do {
        prestamoNombre = prompt('¿Qué préstamo desea solicitar?'+'\n\n'+listaDePrestamos.join('\n'));
        prestamoCantidad = parseInt(prompt('¿Cuantos préstamos necesita?'))
        let cantidadValidada = validarCantidad(prestamoCantidad)

        const prestamo = prestamos.find(prestamo => prestamo.nombre.toLowerCase() === prestamoNombre.toLowerCase());

        if (prestamo) {
            agregarPrestamo(prestamo, prestamo.id, cantidadValidada);
        } else {
            alert('Por favor, elija una opción válida');
        }

        otraEvaluacion = confirm('¿Desea una nueva evaluación o solicitar otro préstamo adicional?')
    } while (otraEvaluacion);

    confirmarPrestamo();
};

const validarCantidad = (prestamoCantidad) => {
    while (Number.isNaN(prestamoCantidad) || prestamoCantidad <= 0) {
        if (prestamoCantidad <= 0) {
            alert('Por favor, ingrese una cantidad válida.');
        } else {
            alert('Los datos ingresados no son correctos.');
        }
        prestamoCantidad = parseInt(prompt('Por favor, ingrese el monto que desea solicitar.'));
    }

    return prestamoCantidad;
}



const agregarPrestamo = (prestamo, prestamoId, prestamoCantidad) => {
    const prestamoRepetido = evaluacion.find(prestamo => prestamo.id ===prestamoId);
    if (prestamoRepetido) {
        prestamoRepetido.cantidad += prestamoCantidad
    } else {
        prestamo.cantidad += prestamoCantidad;
        evaluacion.push(prestamo);
    }
    console.log(evaluacion)
};

const eliminarPrestamo = (prestamoNombre) => {
    evaluacion.forEach((prestamo, index) => {
        if (prestamo.nombre.toLowerCase() === prestamoNombre) {
            if (prestamo.cantidad > 1) {
                prestamo.cantidad--
            } else {
                evaluacion.splice (index, 1)
            }
        }
    })
    confirmarPrestamo();
};

const confirmarPrestamo = () => {
    const listaPrestamos = prestamos.map(prestamo => {
        return '- '+prestamo.nombre+' | Cantidad: '+prestamo.cantidad
    });

    const confirmar = confirm('Préstamos Solicitados: '
    +'\n\n'+listaPrestamos.join('\n')
    +'\n\nSi desea hacer algún cambio en su solicitud de préstamos, presione cancelar. En caso contrario, presione aceptar');

    if (confirmar) {
        finalizarEvaluacion(listaPrestamos);
    } else {
        const prestamoAEliminar = prompt('Ingrese el nombre del prestamo que ya no desea: ');
        eliminarPrestamo(prestamoAEliminar);
    }
};

const finalizarEvaluacion = (listaPrestamos) => {
    const prestamoTotal = prestamos.reduce((acc,elemento) => acc + elemento.cantidad, 0);
    const montoTotal = prestamos.reduce((acc, elemento) => acc + (elemento.valor*elemento.cantidad), 0);
    const interesTotal = prestamos.reduce((acc, elemento) => acc + (elemento.montoInteres*elemento.cantidad), 0);

    alert('Detalle de tu compra:'
        +'\n\n'+listaPrestamos.join('\n')
        +'\n\nTotal de prestamos solicitados: '+prestamoTotal
        +'\n\nEl total del monto solicitado es: '+montoTotal
        +'\n\nInteres total a pagar: '+interesTotal
        +'\n\nMuchas gracias!'
    );
};

const comprar = () => {
    const prestamosEconomicos = confirm('¿Desea ordenar la lista de préstamos del más económico al más costoso?');
    if (prestamosEconomicos) {
        ordenarMenorMayor()
    } else {
        ordenarMayorMenor()
    }
};

comprar()
