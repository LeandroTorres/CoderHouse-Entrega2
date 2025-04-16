//🟡✔️🟢👉🔍📌🚨🔴💡🔁
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
    // 🚨 Si no hay equipos, muestra un mensaje
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

//🟢 Constructor de Objetos Ticket

function Ticket(cliente, idEquipo, tipoTicket, estadoTicket, observaciones) {
  this.clienteTicket = cliente;
  this.idEquipoTicket = idEquipo;
  this.tipoTicket = tipoTicket;
  this.estadoTicket = estadoTicket;
  this.observaciones = observaciones;
}

//🟢Funcion para manejar el Envio de Formulario

document.getElementById("ticketForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Reset, evita que la pagina se recargue

//🟢 Obtener valores de los imputs

  let clienteTicket = document.getElementById("clienteTicket").value.trim();
  let idEquipoTicket = document.getElementById("idEquipoTicket").value.trim();
  let tipoTicket = document.getElementById("tipoTicket").value;
  let estadoTicket = document.getElementById("estadoTicket").value;
  let observaciones = document.getElementById("observaciones").value.trim();

  // 🔍 DEBUGGING
  console.log("Cliente:", clienteTicket);
  console.log("ID Equipo:", idEquipoTicket);
  console.log("Tipo Ticket:", tipoTicket);
  console.log("Estado Ticket:", estadoTicket);
  console.log("Observaciones:", observaciones);

  if (!clienteTicket || !idEquipoTicket || !tipoTicket || !estadoTicket) {
    alert("Por favor, completá todos los campos obligatorios.");
    return;
  }

  //🟢 Crear objeto Ticket con los datos ingresados
  let nuevoTicket = new Ticket(
    clienteTicket,
    idEquipoTicket,
    tipoTicket,
    estadoTicket,
    observaciones
  );

  //🟢 Guarda objeto en el array

  tickets.push(nuevoTicket);

  //🟢 Guardar la lista de tickets el localStorage
  localStorage.setItem("tickets", JSON.stringify(tickets));

  // mostrar en pagina los tickets
  actualizarListaTickets();
  document.getElementById("ticketForm").reset();
});

//🟢 Funcion para mostrar los tickets en la lista HTML
function actualizarListaTickets(listaFiltrada = tickets) {
  let lista = document.getElementById("listaTickets");
  lista.innerHTML = "";

  //🟢 Verifica si hay tickets
  if (listaFiltrada.length > 0) {
      listaFiltrada.forEach(ticket => {
          let li = document.createElement("li");
          li.classList.add("list-group-item");
          li.textContent = `Cliente: ${ticket.clienteTicket}, Id: ${ticket.idEquipoTicket}, Tipo: ${ticket.tipoTicket}, Estado: ${ticket.estadoTicket}, Observaciones: ${ticket.observaciones}`;
          lista.appendChild(li);
      });
  } else {
    //🚨 Si nohay tickets muestra un mensaje
      let li = document.createElement("li");
      li.classList.add("list-group-item", "text-muted", "fst-italic");
      li.textContent = "No se encontraron tickets con esos criterios.";
      lista.appendChild(li);
  }
}

//                  🟢🟢Filtros🟢🟢
function filtrarTickets() {
  const clienteFiltro = document.getElementById("filtroClienteTicket").value.trim().toLowerCase();
  const idEquipoFiltro = document.getElementById("filtroIdEquipoTicket").value.trim().toLowerCase();
  const tipoFiltro = document.getElementById("filtroTipoTicket").value;
  const estadoFiltro = document.getElementById("filtroEstadoTicket").value;

  const ticketsFiltrados = tickets.filter(ticket => {
      return (
          (clienteFiltro === "" || ticket.clienteTicket.toLowerCase().includes(clienteFiltro)) &&
          (idEquipoFiltro === "" || ticket.idEquipoTicket.toLowerCase().includes(idEquipoFiltro)) &&
          (tipoFiltro === "" || ticket.tipoTicket === tipoFiltro) &&
          (estadoFiltro === "" || ticket.estadoTicket === estadoFiltro)
      );
  });

  actualizarListaTickets(ticketsFiltrados);
}
//🟢 Limpia campos en filtro
function limpiarFiltrosTickets() {
  document.getElementById("filtroClienteTicket").value = "";
  document.getElementById("filtroIdEquipoTicket").value = "";
  document.getElementById("filtroTipoTicket").value = "";
  document.getElementById("filtroEstadoTicket").value = "";
  actualizarListaTickets(tickets); // Mostrar todos
}


/* actualizarListaTickets(); */

