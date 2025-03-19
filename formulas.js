    // Recuperar los equipos guardados en LocalStorage (si existen)
    let equipos = JSON.parse(localStorage.getItem("equipos")) || [];

    // Constructor de Objeto
    function Equipo(idEquipo, nombreEquipo, cliente) {
        this.IdEquipo = idEquipo;
        this.NombreEquipo = nombreEquipo;
        this.Cliente = cliente;
    }

    // Función para manejar el envío del formulario
    document.getElementById("equipoForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Reset, Evita que la página se recargue

        // Obtener valores de los inputs
        let idEquipo = document.getElementById("idEquipo").value;
        let cliente = document.getElementById("cliente").value;
        let nombreEquipo = document.getElementById("nombreEquipo").value;

        // Crear objeto Equipo con los datos ingresados
        let nuevoEquipo = new Equipo(idEquipo, nombreEquipo, cliente);

        // Guardar el objeto en el array
        equipos.push(nuevoEquipo);

        // Guardar la lista de equipos en LocalStorage
        localStorage.setItem("equipos", JSON.stringify(equipos));

        // Mostrar en la página los equipos creados
        actualizarListaEquipos();
    });

    // Función para mostrar los equipos en la lista HTML
    function actualizarListaEquipos() {
        let lista = document.getElementById("listaEquipos");
        lista.innerHTML = ""; // Limpiar la lista antes de actualizar

        // Verificar si hay equipos
        if (equipos.length > 0) {
            equipos.forEach(equipo => {
                let li = document.createElement("li");
                li.textContent = `ID: ${equipo.IdEquipo}, Nombre: ${equipo.NombreEquipo}, Cliente: ${equipo.Cliente}`;
                lista.appendChild(li);
            });
        } else {
            // Si no hay equipos, muestra un mensaje
            let li = document.createElement("li");
            li.textContent = "Aún no hay equipos creados.";
            lista.appendChild(li);
        }
    }

    // Llamada inicial para mostrar los equipos guardados cuando la página se carga
    actualizarListaEquipos();
console.log(equipos)
