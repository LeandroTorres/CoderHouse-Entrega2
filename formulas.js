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
// fetch


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

  if (!idEquipo || !clienteTicket || !nombreEquipo) {
    // 💡💡💡 TOASTIFY 💡💡💡
    Toastify({
      text: "Debés completar todos los campos",
      duration: 3000,
      gravity: "top",
      position: "right",
      className: "toast-warning",
      style: {}
    }).showToast();
    return;
 }

  //✔️ Crear objeto Equipo con los datos ingresados
  let nuevoEquipo = new Equipo(idEquipo, nombreEquipo, cliente);

  //✔️Guardar el objeto en el array
  equipos.push(nuevoEquipo);

  // Guardar la lista de equipos en LocalStorage
  localStorage.setItem("equipos", JSON.stringify(equipos));

  //✔️ Mostrar en la página los equipos creados
  actualizarListaEquipos();

  // 💡💡💡 TOASTIFY 💡💡💡

  Toastify({
    text: "Equipo cargado con éxito ✅",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    className: "toast-success",
    style: {}
  }).showToast();

});

//✔️ Función para mostrar los equipos en la lista HTML
function actualizarListaEquipos(listaFiltrada = equipos) {
  let lista = document.getElementById("listaEquipos");
  lista.innerHTML = "";

  if (listaFiltrada.length > 0) {
    listaFiltrada.forEach(equipo => {
      let li = document.createElement("li");
      li.classList.add("list-group-item");
      li.textContent = `| ID: ${equipo.IdEquipo} | Nombre: ${equipo.NombreEquipo} | Cliente: ${equipo.Cliente} |`;
      lista.appendChild(li);
    });
  } else {
    let li = document.createElement("li");
    li.classList.add("list-group-item", "text-muted", "fst-italic");
    li.textContent = "No se encontraron equipos con esos criterios.";
    lista.appendChild(li);
  }
}

function filtrarEquipos() {
  const clienteFiltro = document.getElementById("filtroClienteEquipo").value.trim().toLowerCase();
  const idEquipoFiltro = document.getElementById("filtroIdEquipo").value.trim().toLowerCase();
  const nombreEquipoFiltro = document.getElementById("filtroNombreEquipo").value.trim().toLowerCase();

  const equiposGuardados = JSON.parse(localStorage.getItem("equipos")) || [];

  const equiposFiltrados = equiposGuardados.filter(equipo => {
    return (
      (clienteFiltro === "" || equipo.Cliente.toLowerCase().includes(clienteFiltro)) &&
      (idEquipoFiltro === "" || equipo.IdEquipo.toLowerCase().includes(idEquipoFiltro)) &&
      (nombreEquipoFiltro === "" || equipo.NombreEquipo.toLowerCase().includes(nombreEquipoFiltro))
    );
  });

  // 💡💡💡 TOASTIFY 💡💡💡
  Toastify({
    text: "Filtros aplicados 🔍",
    duration: 2500,
    gravity: "bottom",
    position: "right",
    className: "toast-success",
    style: {}
  }).showToast();


  actualizarListaEquipos(equiposFiltrados);
}

function limpiarFiltrosEquipos() {
  document.getElementById("filtroClienteEquipo").value = "";
  document.getElementById("filtroIdEquipo").value = "";
  document.getElementById("filtroNombreEquipo").value = "";
  actualizarListaEquipos(); // Vuelve a mostrar todos
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnFiltrar").addEventListener("click", filtrarEquipos);
  document.getElementById("btnLimpiar").addEventListener("click", limpiarFiltrosEquipos);
});

// 💡💡💡 TOASTIFY 💡💡💡
Toastify({
  text: "Filtros limpiados ♻️",
  duration: 2500,
  gravity: "bottom",
  position: "right",
  className: "toast-success",
  style: {}
}).showToast();

//✔️ Llamada inicial para mostrar los equipos guardados cuando la página se carga
actualizarListaEquipos();
console.log(equipos)



//         🟢🟢🟢MANEJO DE DATOS DE FORMULARIO DE TICKETS🟢🟢🟢

tickets = JSON.parse(localStorage.getItem("tickets")) || [];

//🟢 Constructor de Objetos Ticket

function Ticket(cliente, idEquipo, tipoTicket, estadoTicket, observaciones, fechaTicket) {
  this.clienteTicket = cliente;
  this.idEquipoTicket = idEquipo;
  this.tipoTicket = tipoTicket;
  this.estadoTicket = estadoTicket;
  this.observaciones = observaciones;
  this.fechaTicket = fechaTicket;
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
  let fechaTicket = document.getElementById("fechaTicket").value;

  // 🔍 DEBUGGING
  console.log("Cliente:", clienteTicket);
  console.log("ID Equipo:", idEquipoTicket);
  console.log("Tipo Ticket:", tipoTicket);
  console.log("Estado Ticket:", estadoTicket);
  console.log("Observaciones:", observaciones);

  if (!clienteTicket || !idEquipoTicket || !tipoTicket || !estadoTicket) {
    // 💡💡💡 TOASTIFY 💡💡💡
    Toastify({
      text: "Debés completar todos los campos",
      duration: 3000,
      gravity: "top",
      position: "right",
      className: "toast-warning",
      style: {}
    }).showToast();
    return;
  }

  //🟢 Crear objeto Ticket con los datos ingresados
  let nuevoTicket = new Ticket(
    clienteTicket,
    idEquipoTicket,
    tipoTicket,
    estadoTicket,
    observaciones,
    fechaTicket,
  );

  //🟢 Guarda objeto en el array

  tickets.push(nuevoTicket);

  //🟢 Guardar la lista de tickets el localStorage
  localStorage.setItem("tickets", JSON.stringify(tickets));

  // mostrar en pagina los tickets
  actualizarListaTickets();
  Toastify({
    text: "Ticket cargado correctamente",
    duration: 3000,
    gravity: "top",
    position: "right",
    className: "toast-success",
    style: {}
  }).showToast();
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
      li.textContent = `Fecha: ${ticket.fechaTicket}, Cliente: ${ticket.clienteTicket}, Id: ${ticket.idEquipoTicket}, Tipo: ${ticket.tipoTicket}, Estado: ${ticket.estadoTicket}, Observaciones: ${ticket.observaciones}`;
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
  const fechaFiltro = document.getElementById("filtroFechaTicket").value;
  const clienteFiltro = document.getElementById("filtroClienteTicket").value.trim().toLowerCase();
  const idEquipoFiltro = document.getElementById("filtroIdEquipoTicket").value.trim().toLowerCase();
  const tipoFiltro = document.getElementById("filtroTipoTicket").value;
  const estadoFiltro = document.getElementById("filtroEstadoTicket").value;

  const ticketsFiltrados = tickets.filter(ticket => {
    return (
      (fechaFiltro === "" || ticket.fechaTicket === fechaFiltro) &&
      (clienteFiltro === "" || ticket.clienteTicket.toLowerCase().includes(clienteFiltro)) &&
      (idEquipoFiltro === "" || ticket.idEquipoTicket.toLowerCase().includes(idEquipoFiltro)) &&
      (tipoFiltro === "" || ticket.tipoTicket === tipoFiltro) &&
      (estadoFiltro === "" || ticket.estadoTicket === estadoFiltro)      
    );       
  });

  actualizarListaTickets(ticketsFiltrados);
  Toastify({
    text: "Filtro aplicado",
    duration: 3000,
    gravity: "top",
    position: "right",
    className: "toast-info",
    style: {},
  }).showToast();
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

