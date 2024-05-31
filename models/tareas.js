"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tarea_1 = require("./tarea");
class Tareas {
    get listadoArr() {
        const Listado = [];
        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            Listado.push(tarea);
        });
        return Listado;
    }
    constructor() {
        this._listado = {};
    }
    borrarTarea(id = "") {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }
    cargarTareasFromArray(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        });
    }
    crearTarea(desc = "") {
        const nuevaTarea = new tarea_1.Tarea(desc);
        this._listado[nuevaTarea.id] = nuevaTarea;
    }
    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? "Completada".green : "Pendiente".red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }
    listarPendientesCompletadas(completadas = true) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const { desc, completadoEn } = tarea;
            const estado = completadoEn ? "Completada".green : "Pendiente".red;
            if (completadoEn === completadas) {
                contador += 1;
                console.log(`${contador.toString().green} ${desc} :: ${estado}`);
            }
            else {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green} ${desc} :: ${estado}`);
                }
            }
        });
    }
    toggleCompletadas(ids = []) {
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
exports.default = Tareas;
