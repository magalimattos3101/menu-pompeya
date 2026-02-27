const PRODUCTOS_POMPEYA = [
    {
        nombre: "Buñuelitos de acelga y nuez",
        descripcion: "Con salsa alioli, limón y salsa cuatro quesos.",
        precio: 11900,
        img: "img/buñuelitos.webp",
        categoria: "tapeos",
        tipo: ["vegetariano"]
    },
    {
        nombre: "Súper Pompeya",
        descripcion: "Hamburguesa de carne, queso cheddar, panceta, huevo, tomate y salsa barbacoa en pan de papa casero.",
        precio: 17900,
        img: "img/hamburguesa-super-pompeya.webp",
        categoria: "burgers"
    },
    {
        nombre: "Bongo Bong",
        descripcion: "Hamburguesa casera de hongos secos y champignón, tomate cherry, queso danbo, lechuga, cebolla morada y mayonesa de ajo en pan casero de calabaza y ajo. Opción vegana: con queso danbo vegano y mayonesa de ajo vegana.",
        precio: 14800,
        img: "img/bongo-bong.webp",
        categoria: "veggie",
        tipo: ["vegetariano","vegano"]
    },
        {
        nombre: "Beduino",
        descripcion: "Milanesa de seitán casera, queso danbo, hummus de garbanzos, tomate fresco y cebolla crispy en pan focaccia.",
        precio: 14800,
        img: "img/beduino.webp",
        categoria: "sandwiches",
        tipo: ["vegetariano"]
    },
    {
        nombre: "Del bosque",
        descripcion: "Champignón y cebolla de verdeo salteados, muzzarella, queso parmesano y salsa de tomate.",
        precio: 22000,
        img: "img/del-bosque.webp",
        categoria: "pizzas",
        tipo: ["vegetariano","vegano"]
    },
    {
        nombre: "Caesar",
        descripcion: "Pechuga de pollo a la plancha trozada, mix de hojas verdes, croutons, parmesano y aderezo de la casa.",
        precio: 14500,
        img: "img/caesar.webp",
        categoria: "ensaladas"
    },
    {
        nombre: "Chocotorta de la casa",
        descripcion: "Con licor de café.",
        precio: 7000,
        img: "img/chocotorta.webp",
        categoria: "postres"
    },
    {
        nombre: "Coca-Cola lata",
        descripcion: "354 mL",
        precio: 4000,
        img: "img/coca.webp",
        categoria: "bebidas"
    }
];

function renderizarProductos() {
    // 1. Mapeamos los contenedores
    const contenedores = {
        tapeos: document.getElementById('contenedor-tapeos'),
        burgers: document.getElementById('contenedor-burgers'),
        veggie: document.getElementById('contenedor-veggie'),
        pizzas: document.getElementById('contenedor-pizzas'),
        ensaladas: document.getElementById('contenedor-ensaladas'),
        sandwiches: document.getElementById('contenedor-sandwiches'),
        postres: document.getElementById('contenedor-postres'),
        bebidas: document.getElementById('contenedor-bebidas')
    };

    // 2. Limpiamos contenedores por si acaso
    Object.values(contenedores).forEach(c => { if(c) c.innerHTML = ''; });

    // 3. Recorremos los productos y los insertamos
    PRODUCTOS_POMPEYA.forEach(prod => {
        
        // --- LÓGICA DE LOGOS MÚLTIPLES ---
        let htmlLogos = ""; 
        if (prod.tipo && Array.isArray(prod.tipo)) {
            prod.tipo.forEach(t => {
                if (t === "vegano") {
                    htmlLogos += `<img src="img/icono-vegano.png" alt="Vegano" class="icono-tipo-dieta">`;
                } else if (t === "vegetariano") {
                    htmlLogos += `<img src="img/icono-vegetariano.png" alt="Vegetariano" class="icono-tipo-dieta">`;
                }
            });
        }
        // ---------------------------------

        const itemHTML = `
            <article class="menu-item">
                <div class="menu-item-info">
                    <h3 class="menu-item-titulo">
                        ${prod.nombre} 
                        <span class="contenedor-iconos">${htmlLogos}</span>
                    </h3>
                    <p class="menu-item-descripcion">${prod.descripcion}</p>
                    <span class="menu-item-precio">$${prod.precio.toLocaleString('es-AR')}</span>
                </div>
                <div class="menu-item-img-wrapper">
                    <img src="${prod.img}" alt="${prod.nombre}" class="menu-item-img">
                    <button class="btn-agregar-plus" onclick="abrirModal('${prod.nombre}', ${prod.precio})" aria-label="Añadir al pedido">+</button>
                </div>
            </article>
        `;

        // Lo metemos en su sección correspondiente
        if (contenedores[prod.categoria]) {
            contenedores[prod.categoria].innerHTML += itemHTML;
        }
    });
}

// IMPORTANTE: Llamá a la función para que se ejecute al abrir la página
document.addEventListener('DOMContentLoaded', renderizarProductos);

/* ==========================================================================
   1. CONFIGURACIÓN Y ESTADO GLOBAL (Nuestra fuente de la verdad)
   ========================================================================== */
let carrito = [];
let productoTemporal = null;

const CONFIG_BAR = {
    telefono: "5491139520659", // Reemplazar por tu número
    nombre: "Pompeya Pub Social"
};

/* ==========================================================================
   2. LÓGICA DE NAVEGACIÓN (Vistas)
   ========================================================================== */
function abrirCategorias() {
    document.getElementById('vista-portada').style.display = 'none';
    document.getElementById('vista-categorias').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function volverPortada() {
    document.getElementById('vista-categorias').style.display = 'none';
    document.getElementById('vista-productos').style.display = 'none';
    document.getElementById('vista-portada').style.display = 'block';
}

function verProductos(categoriaId) {
    console.log("El botón pidió abrir el ID:", categoriaId); 

    document.getElementById('vista-categorias').style.display = 'none';
    document.getElementById('vista-productos').style.display = 'block';

    const todasLasSecciones = document.querySelectorAll('.grupo-productos');
    todasLasSecciones.forEach(seccion => {
        seccion.style.display = 'none';
    });

    const seccionAMostrar = document.getElementById(categoriaId);
    
    if (seccionAMostrar) {
        seccionAMostrar.style.display = 'block';
        console.log("¡Éxito! Sección encontrada y mostrada.");
    } else {
        console.error("❌ ERROR: No existe ningún elemento en tu HTML con el id='" + categoriaId + "'");
        todasLasSecciones.forEach(seccion => seccion.style.display = 'block');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function volverCategorias() {
    document.getElementById('vista-productos').style.display = 'none';
    document.getElementById('vista-categorias').style.display = 'block';
}

/* ==========================================================================
   3. GESTIÓN DEL CARRITO (Core Logic)
   ========================================================================== */

function abrirModal(nombre, precio) {
    productoTemporal = { nombre, precio };
    const modal = document.getElementById('modal-aclaraciones');
    
    document.getElementById('modal-producto-nombre').innerText = nombre;
    document.getElementById('modal-input-aclaracion').value = ''; 
    
    modal.style.display = 'flex';
    document.getElementById('overlay').style.display = 'block'; 
}

function cerrarModal() {
    document.getElementById('modal-aclaraciones').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    productoTemporal = null;
}

function confirmarAgregar() {
    if (!productoTemporal) return;

    const inputNota = document.getElementById('modal-input-aclaracion').value;
    const nota = inputNota.trim() !== '' ? inputNota.trim() : null;
    
    const itemExistente = carrito.find(item => 
        item.nombre === productoTemporal.nombre && item.nota === nota
    );

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            ...productoTemporal,
            nota: nota,
            cantidad: 1
        });
    }

    actualizarInterfazGlobal();
    cerrarModal();
    animarBotonPedido();
}

function calcularTotalCarrito() {
    return carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
}

function actualizarInterfazGlobal() {
    const btnPedido = document.getElementById('btn-pedido');
    const cantCarrito = document.getElementById('cantidad-carrito');
    const displayTotal = document.getElementById('total-carrito');

    if (carrito.length > 0) {
        btnPedido.style.display = 'block';
        
        const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        const totalDinero = calcularTotalCarrito();

        let costoEnvio = 0;
        if (totalDinero < 22400) {
            costoEnvio = 400;
        }
        const totalFinal = totalDinero + costoEnvio;

        cantCarrito.innerText = totalUnidades;
        displayTotal.innerText = totalFinal.toLocaleString('es-AR');
    } else {
        btnPedido.style.display = 'none';
    }
}

function animarBotonPedido() {
    const btnPedido = document.getElementById('btn-pedido');
    btnPedido.classList.remove('animar-btn'); 
    void btnPedido.offsetWidth; 
    btnPedido.classList.add('animar-btn');
}

/* ==========================================================================
   4. CARRITO LATERAL (Offcanvas)
   ========================================================================== */

function abrirCarrito() {
    renderizarListaCarrito();
    document.getElementById('carrito-lateral').classList.add('abierto');
    document.getElementById('overlay').style.display = 'block';
}

function cerrarCarrito() {
    document.getElementById('carrito-lateral').classList.remove('abierto');
    document.getElementById('overlay').style.display = 'none';
}

function renderizarListaCarrito() {
    const contenedor = document.getElementById('lista-carrito');
    const displayTotalLateral = document.getElementById('total-carrito-lateral');
    const totalDinero = calcularTotalCarrito(); 
    
    contenedor.innerHTML = ''; 

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; opacity:0.5; margin-top:50px;">Tu carrito está vacío</p>';
        displayTotalLateral.innerText = "$0";
        return;
    }

    carrito.forEach((item, index) => {
        const precioTotalItem = item.precio * item.cantidad;
        const textoNota = item.nota ? `<small style="color:var(--rosa)">Aclaración: ${item.nota}</small>` : '';

        contenedor.innerHTML += `
            <div class="item-carrito">
                <div class="item-carrito-info">
                    <p style="margin:0; font-weight:700;">${item.cantidad}x ${item.nombre}</p>
                    ${textoNota}
                    <p style="margin:5px 0 0 0; font-weight:900;">$${precioTotalItem.toLocaleString('es-AR')}</p>
                </div>
                <div class="item-carrito-controles">
                    <button type="button" class="btn-control" aria-label="Restar uno" onclick="modificarCantidad(${index}, -1)">-</button>
                    <button type="button" class="btn-control" aria-label="Sumar uno" onclick="modificarCantidad(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    let costoEnvio = 0;
    let textoEnvio = "¡Gratis!"; 
    
    if (totalDinero < 22400) {
        costoEnvio = 400;
        textoEnvio = "$400";
    }
    
    const totalFinal = totalDinero + costoEnvio;

    contenedor.innerHTML += `
        <div style="border-top: 1px dashed #666; margin-top: 15px; padding-top: 10px; text-align: right;">
            <p style="margin:0; font-size: 0.9em; opacity: 0.8;">Subtotal: $${totalDinero.toLocaleString('es-AR')}</p>
            <p style="margin:5px 0 0 0; font-size: 0.95em; font-weight: bold; color: ${costoEnvio > 0 ? 'var(--rosa)' : '#25D366'};">
                Envío: ${textoEnvio}
            </p>
        </div>
    `;

    displayTotalLateral.innerText = `$${totalFinal.toLocaleString('es-AR')}`;
}

function modificarCantidad(index, cambio) {
    const item = carrito[index];
    
    if (cambio === 1) {
        item.cantidad++;
    } else {
        if (item.cantidad > 1) {
            item.cantidad--;
        } else {
            carrito.splice(index, 1);
        }
    }

    actualizarInterfazGlobal();
    renderizarListaCarrito();

    if (carrito.length === 0) {
        cerrarCarrito();
    }
}

/* ==========================================================================
   5. CHECKOUT Y ENVÍO A WHATSAPP
   ========================================================================== */

function enviarPedido() {
    cerrarCarrito();
    
    const totalCarrito = calcularTotalCarrito();
    let costoEnvio = 0;
    
    if (totalCarrito < 22400) {
        costoEnvio = 400;
    }
    
    const totalFinal = totalCarrito + costoEnvio;

    document.getElementById('total-modal-final').innerText = totalFinal.toLocaleString('es-AR');
    document.getElementById('modal-datos-envio').style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
}

function cerrarModalDatos() {
    document.getElementById('modal-datos-envio').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function enviarPedidoFinal(event) {
    event.preventDefault();

    try {
        const form = document.getElementById('form-datos-envio');
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const nombre = document.getElementById('dato-nombre').value.trim() || "-";
        const direccion = document.getElementById('dato-direccion').value.trim() || "-";
        const calles = document.getElementById('dato-entre-calles').value.trim() || "-";
        const piso = document.getElementById('dato-piso').value.trim() || "-";
        const localidad = document.getElementById('dato-localidad').value.trim() || "-";
        const pago = document.getElementById('dato-pago').value || "-";
        
        const totalCarrito = calcularTotalCarrito();
        let costoEnvio = 0;
        
        if (totalCarrito < 22400) {
            costoEnvio = 400;
        }
        
        const totalFinal = totalCarrito + costoEnvio;

        let mensaje = `Hola Pompeya! Quiero realizar el siguiente pedido:\n\n`;
        
        mensaje += `*Nombre*\n_${nombre}_\n\n`;
        mensaje += `*Dirección*\n_${direccion}_\n\n`; 
        mensaje += `*Entre calles*\n_${calles}_\n\n`;
        mensaje += `*Piso y Dpto*\n_${piso}_\n\n`;
        mensaje += `*Método de pago*\n_${pago}_\n\n`;
        mensaje += `*Lo enviamos a (seleccione la zona): *\n_${localidad}_\n\n`;
        
        mensaje += `*Pedido:*\n\n\n`;

        carrito.forEach(item => {
            const subtotalItem = item.precio * item.cantidad;
            
            mensaje += `*${item.cantidad}* x \n`;
            
            let categoria = item.categoria ? `_${item.categoria.toUpperCase()}_ ` : "";
            mensaje += `${categoria}*${item.nombre.toUpperCase()}* \n`;

            if (item.nota && item.nota.trim() !== "") {
                let notasArray = item.nota.split('\n');
                notasArray.forEach(linea => {
                    if (linea.trim() !== "") {
                        mensaje += ` - ${linea.trim()}\n`;
                    }
                });
            }
            
            mensaje += `Subtotal = $${subtotalItem.toLocaleString('es-AR')}\n\n\n`;
        });

        if (costoEnvio > 0) {
            mensaje += `Subtotal productos: $${totalCarrito.toLocaleString('es-AR')}\n`;
            mensaje += `Costo de envío: $${costoEnvio.toLocaleString('es-AR')}\n`;
        } else {
            mensaje += `Costo de envío: ¡Gratis!\n`;
        }
        
        mensaje += `*Total pedido: $${totalFinal.toLocaleString('es-AR')}*\n`;
        mensaje += `Gracias por tu pedido! En breve nos comunicamos para coordinar el envío 😊`;

        const url = `https://wa.me/${CONFIG_BAR.telefono}?text=${encodeURIComponent(mensaje)}`;
        
        window.location.href = url;
        
        cerrarModalDatos();
        
    } catch (error) {
        console.error("Error al procesar el pedido:", error);
        alert("Ocurrió un problema al procesar los datos. Por favor, intentá de nuevo.");
    }
}