"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leerDB = exports.guardarDB = void 0;
const fs_1 = __importDefault(require("fs"));
const archivo = "./db/data.json";
const guardarDB = (data) => {
    fs_1.default.writeFileSync(archivo, JSON.stringify(data));
};
exports.guardarDB = guardarDB;
const leerDB = () => {
    if (!fs_1.default.existsSync(archivo)) {
        return null;
    }
    const info = fs_1.default.readFileSync(archivo, { encoding: "utf-8" });
    const data = JSON.parse(info);
    return data;
};
exports.leerDB = leerDB;
