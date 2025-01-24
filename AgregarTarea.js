
const SERVER_URL = 'http://localhost:3000/tareas';

async function crearTarea() {
    let nuevaTareaTexto = document.getElementById("nuevaTarea").value;

    if (nuevaTareaTexto === "") {
        alert("Por favor, ingrese una tarea");
        return;
    }


    const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: nuevaTareaTexto, completada: false }),
    });

    const nuevaTarea = await response.json();


    agregarTareaALista(nuevaTarea);
    document.getElementById("nuevaTarea").value = "";
}

function agregarTareaALista(tarea) {
    let nuevaTarea = document.createElement("li");
    nuevaTarea.textContent = tarea.texto + " ";
    nuevaTarea.dataset.id = tarea.id;

    if (tarea.completada) {
        nuevaTarea.style.textDecoration = "line-through";
    }

    let botonEliminar = document.createElement("button");

    botonEliminar.onclick = async function () {
        await eliminarTarea(tarea.id);
        nuevaTarea.remove();
    }
    nuevaTarea.appendChild(botonEliminar);

async function eliminarTarea(id) {
    await fetch(`${SERVER_URL}/${id}`, {
        method: 'DELETE',
    });
}
async function marcarTareaComoCompletada(id) {
    await fetch(`${SERVER_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completada: true }),
    });
}


async function cargarTareas() {
    const response = await fetch(SERVER_URL);
    const tareas = await response.json();
    tareas.forEach(tarea => {
        agregarTareaALista(tarea);
    });
}


window.onload = cargarTareas;
}
