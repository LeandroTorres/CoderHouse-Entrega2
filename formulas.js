// Creo "equipos" y "tickets" que es donde se mostrararan los datos cargados
let equipos = [];
let tickets = [];

//         ✔️✔️✔️MANEJO DE DATOS DE ABM EQUIPOS✔️✔️✔️
if (localStorage.getItem("equipos")) {
    // Si ya hay datos en LocalStorage, los uso
    equipos = JSON.parse(localStorage.getItem("equipos"));
    actualizarListaEquipos();
} else {
    // Si no hay datos, cargo desde el JSON externo
    fetch("BD.json")
        .then(res => res.json())
        .then(data => {
            equipos = data;
            localStorage.setItem("equipos", JSON.stringify(equipos));
            actualizarListaEquipos();
        })
        .catch(error => console.error("Error al cargar los equipos:", error));
}

// ✔️Constructor de Objeto Equipo
function Equipo(idEquipo, nombreEquipo, cliente) {
    this.IdEquipo = idEquipo;
    this.NombreEquipo = nombreEquipo;
    this.Cliente = cliente;
}

//✔️ Función para manejar el envío del formulario
document.getElementById("equipoForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Reset, Evita que la página se recargue

    // ✔️Obtener valores de los inputs
    let idEquipo = document.getElementById("idEquipo").value;
    let cliente = document.getElementById("cliente").value;
    let nombreEquipo = document.getElementById("nombreEquipo").value;

    //✔️ Crear objeto Equipo con los datos ingresados
    let nuevoEquipo = new Equipo(idEquipo, nombreEquipo, cliente);

    //✔️Guardar el objeto en el array
    equipos.push(nuevoEquipo);

    // Guardar la lista de equipos en LocalStorage
    localStorage.setItem("equipos", JSON.stringify(equipos));

    //✔️ Mostrar en la página los equipos creados
    actualizarListaEquipos();
});

//✔️ Función para mostrar los equipos en la lista HTML
function actualizarListaEquipos() {
    let lista = document.getElementById("listaEquipos");
    lista.innerHTML = ""; // Limpiar la lista antes de actualizar

    //✔️ Verificar si hay equipos
    if (equipos.length > 0) {
        equipos.forEach(equipo => {
            let li = document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent = `ID: ${equipo.IdEquipo}, Nombre: ${equipo.NombreEquipo}, Cliente: ${equipo.Cliente}`;
            lista.appendChild(li);
        });
    } else {
        // ✔️Si no hay equipos, muestra un mensaje
        let li = document.createElement("li");
        li.classList.add("list-group-item", "text-muted", "fst-italic"); // estilo para el mensaje vacío
        li.textContent = "Aún no hay equipos cargados.";
        lista.appendChild(li);
    }
}

//✔️ Llamada inicial para mostrar los equipos guardados cuando la página se carga
actualizarListaEquipos();
console.log(equipos)



//         🟢🟢🟢MANEJO DE DATOS DE FORMULARIO DE TICKETS🟢🟢🟢

tickets = JSON.parse(localStorage.getItem("tickets")) || [];


//🟢 Constructor de Objeto Ticket
function Ticket(cliente, idEquipo, tipoTicket, estadoTicket, observaciones) {
    this.clienteTicket = cliente;
    this.idEquipoTicket = idEquipo;
    this.tipoTicket = tipoTicket;
    this.estadoTicket = estadoTicket;
    this.observaciones = observaciones;
}

//🟢 Función para manejar el envío del formulario
document.getElementById("ticketForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que la página se recargue

    // 🟢Obtener valores de los inputs
    let clienteTicket = document.getElementById("cliente").value;
    let idEquipoTicket = document.getElementById("idEquipo").value;
    let tipoTicket = document.getElementById("tipoTicket").value;
    let estadoTicket = document.getElementById("estadoTicket").value;
    let observaciones = document.getElementById("observaciones").value;

    // 🟡Validación de campos obligatorios
    if (!clienteTicket || !idEquipoTicket || !tipoTicket || !estadoTicket) {
        alert("Por favor, completá todos los campos obligatorios.");
    
    }

    //🟢 Crear objeto ticket con los datos ingresados
    let nuevoTicket = new Ticket(
        clienteTicket,
        idEquipoTicket,
        tipoTicket,
        estadoTicket,
        observaciones
    );

    //🟢Guardar el objeto en el array
    tickets.push(nuevoTicket);

    //🟢 Guardar en localStorage
    localStorage.setItem("tickets", JSON.stringify(tickets));

    //🟢 Actualizar vista
    actualizarListaTickets();
});