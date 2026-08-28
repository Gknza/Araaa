const envoltura = document.querySelector(".envoltura-sobre");
const carta = document.querySelector(".carta");

// Función que maneja la apertura/cierre
function toggleCarta(e) {
    // Evita que el evento se propague si es necesario
    e.stopPropagation();

    // Verificamos si el clic/toque fue en el corazón o en el sobre (o sus partes)
    const target = e.target;
    if (target.matches(".sobre") || 
        target.matches(".solapa-derecha") ||
        target.matches(".solapa-izquierda") ||
        target.matches(".corazon") ||
        target.closest(".corazon")) { // <-- Importante: si toca los pseudoelementos, 'closest' lo captura

        // Si la carta ya está abierta, la cerramos
        if (envoltura.classList.contains("abierto")) {
            cerrarCarta();
            return;
        }

        // Abrir la carta
        envoltura.classList.add("abierto");
        envoltura.classList.add("desactivar-sobre");

        if (!carta.classList.contains("abierta")) {
            setTimeout(() => {
                carta.classList.add("mostrar-carta");
                setTimeout(() => {
                    carta.classList.remove("mostrar-carta");
                    carta.classList.add("abierta");
                }, 500);
            }, 1000);
        }
    } else {
        // Si se hace clic fuera del sobre, cerramos la carta
        if (envoltura.classList.contains("abierto")) {
            cerrarCarta();
        }
    }
}

function cerrarCarta() {
    envoltura.classList.remove("abierto");
    envoltura.classList.remove("desactivar-sobre");
    if (carta.classList.contains("abierta")) {
        carta.classList.add("cerrando-carta");
        setTimeout(() => {
            carta.classList.remove("cerrando-carta");
            carta.classList.remove("abierta");
        }, 500);
    }
}

// Usamos 'pointerdown' que funciona en todos los dispositivos
document.addEventListener("pointerdown", toggleCarta);

// También mantenemos 'click' por compatibilidad
document.addEventListener("click", toggleCarta);
