import "colors";
import {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} from "./helpers/inquirer";
import { guardarDB, leerDB } from "./helpers/guardarArchivo";
import Tarea from "./models/tarea";
import Tareas from "./models/tareas";

const main = async (): Promise<void> => {
  let opt: string = "";

  const listaTareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    // Cargar tareas
    listaTareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1": // Crear opción
        const desc: string = await leerInput("Descripción: ");
        listaTareas.crearTarea(desc);
        break;
      case "2": // Ver tareas
        listaTareas.listadoCompleto();
        break;
      case "3": // Lista de tareas completadas
        listaTareas.listarPendientesCompletadas(true);
        break;
      case "4": // Lista de tareas pendientes
        listaTareas.listarPendientesCompletadas(false);
        break;
      case "5": // Completado / Pendientes
        const ids: string[] = await mostrarListadoCheckList(
          listaTareas.listadoArr
        );
        listaTareas.toggleCompletadas(ids);
        break;
      case "6": // Borrar tareas
        const idBorrar: string = await listadoTareasBorrar(
          listaTareas.listadoArr
        );
        if (idBorrar !== "0") {
          const confirmacion: boolean = await confirmar("¿Estás seguro?");
          if (confirmacion) {
            listaTareas.borrarTarea(idBorrar);
            console.log("Tarea borrada");
          }
        }
        break;
    }

    guardarDB(listaTareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
