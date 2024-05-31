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
exports.mostrarListadoCheckList = exports.confirmar = exports.listadoTareasBorrar = exports.leerInput = exports.pausa = exports.inquirerMenu = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
require("colors");
const preguntas = [
    {
        type: "list",
        name: "option",
        message: "¿Qué desea hacer?",
        choices: [
            { value: "1", name: `${"1.".green} Crear tarea` },
            { value: "2", name: `${"2.".green} Ver tarea` },
            { value: "3", name: `${"3.".green} Ver tareas completadas` },
            { value: "4", name: `${"4.".green} Ver tareas pendientes` },
            { value: "5", name: `${"5.".green} Completar tarea(s)` },
            { value: "6", name: `${"6.".green} Borrar tarea` },
            { value: "0", name: `${"0.".green} Salir` },
        ],
    },
];
const pausa = () => __awaiter(void 0, void 0, void 0, function* () {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `presione ${"enter"} para continuar`,
        },
    ];
    yield inquirer_1.default.prompt(question);
});
exports.pausa = pausa;
const inquirerMenu = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log("=====================".green);
    console.log("Seleccione una opción".bgMagenta);
    console.log("=====================".green);
    const { option } = yield inquirer_1.default.prompt(preguntas);
    yield pausa();
    return option;
});
exports.inquirerMenu = inquirerMenu;
const leerInput = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Por favor ingrese un valor";
                }
                return true;
            },
        },
    ];
    const { desc } = yield inquirer_1.default.prompt(question);
    return desc;
});
exports.leerInput = leerInput;
const listadoTareasBorrar = (tareas) => __awaiter(void 0, void 0, void 0, function* () {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return `${idx} ${tarea.desc}`;
    });
    choices.unshift(`${"0.".green} Cancelar`);
    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "Borrar",
            choices,
        },
    ];
    const { id } = yield inquirer_1.default.prompt(preguntas);
    return id;
});
exports.listadoTareasBorrar = listadoTareasBorrar;
const confirmar = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message,
        },
    ];
    const { ok } = yield inquirer_1.default.prompt(question);
    return ok;
});
exports.confirmar = confirmar;
const mostrarListadoCheckList = (tareas) => __awaiter(void 0, void 0, void 0, function* () {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: tarea.completadoEn ? true : false,
        };
    });
    const preguntas = [
        {
            type: "checkbox",
            name: "tareas",
            message: "Seleccione",
            choices,
        },
    ];
    const { tareas: ids } = yield inquirer_1.default.prompt(preguntas);
    return ids.map((id) => id);
});
exports.mostrarListadoCheckList = mostrarListadoCheckList;
