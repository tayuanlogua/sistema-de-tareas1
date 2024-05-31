"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const inquirer_1 = require("./helpers/inquirer");
const guardarArchivo_1 = require("./helpers/guardarArchivo");
const tareas_1 = __importDefault(require("./models/tareas"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let opt = "";
    const listaTareas = new tareas_1.default();
    const tareasDB = (0, guardarArchivo_1.leerDB)();
    if (tareasDB) {
        // Cargar tareas
        listaTareas.cargarTareasFromArray(tareasDB);
    }
    do {
        opt = yield (0, inquirer_1.inquirerMenu)();
        switch (opt) {
            case "1": // Crear opción
                const desc = yield (0, inquirer_1.leerInput)("Descripción: ");
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
                const ids = yield (0, inquirer_1.mostrarListadoCheckList)(listaTareas.listadoArr);
                listaTareas.toggleCompletadas(ids);
                break;
            case "6": // Borrar tareas
                const idBorrar = yield (0, inquirer_1.listadoTareasBorrar)(listaTareas.listadoArr);
                if (idBorrar !== "0") {
                    const confirmacion = yield (0, inquirer_1.confirmar)("¿Estás seguro?");
                    if (confirmacion) {
                        listaTareas.borrarTarea(idBorrar);
                        console.log("Tarea borrada");
                    }
                }
                break;
        }
        (0, guardarArchivo_1.guardarDB)(listaTareas.listadoArr);
        yield (0, inquirer_1.pausa)();
    } while (opt !== "0");
});
main();
