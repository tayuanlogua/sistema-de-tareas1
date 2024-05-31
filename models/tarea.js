"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Tarea {
    constructor(desc) {
        this.id = (0, uuid_1.v4)();
        this.desc = desc;
        this.completadoEn = null;
    }
}
exports.default = Tarea;
