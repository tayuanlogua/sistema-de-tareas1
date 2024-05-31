import { Tarea } from "./tarea";

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

  listarPendientesCompletadas(completadas: boolean = true): void {
    console.log();
    let contador = 0;
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      if (completadoEn === completadas) {
        contador += 1;
        console.log(`${contador.toString().green} ${desc} :: ${estado}`);
      } else {
        if (completadoEn) {
          contador += 1;
          console.log(`${contador.toString().green} ${desc} :: ${estado}`);
        }
      }
    });
  }

  toggleCompletadas(ids: string[] = []): void {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (tarea) {
        tarea.completadoEn = tarea.completadoEn
          ? null
          : new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        tarea.completadoEn = null;
      }
    });
  }
}

export default Tareas;
