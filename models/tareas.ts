import Tarea from "./tarea";

class Tareas {
  private _listado: { [key: string]: Tarea };

  get listadoArr(): Tarea[] {
    const Listado: Tarea[] = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      Listado.push(tarea);
    });
    return Listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id: string = ""): void {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas: Tarea[] = []): void {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc: string = ""): void {
    const nuevaTarea = new Tarea(desc);
    this._listado[nuevaTarea.id] = nuevaTarea;
  }

  listadoCompleto(): void {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${idx} ${desc} :: ${estado}`);
    });
  }

  toggleCompletadas(ids: string[] = []): void {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (tarea) {
        tarea.completadoEn = tarea.completadoEn ? null : new Date();
      }
    });

    // Se recorre la lista para actualizar las tareas no incluidas en 'ids'
    this.listadoArr.forEach((tarea: Tarea) => {
      // Declaración explícita del tipo de tarea
      if (!ids.includes(tarea.id)) {
        tarea.completadoEn = null;
      }
    });
  }
}

export default Tareas;
