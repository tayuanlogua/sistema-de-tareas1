import fs from "fs";

const archivo: string = "./db/data.json";

interface Data {
  [key: string]: any; // Puedes definir una interfaz más específica según tu estructura de datos
}

export const guardarDB = (data: Data): void => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

export const leerDB = (): Data | null => {
  if (!fs.existsSync(archivo)) {
    return null;
  }
  const info = fs.readFileSync(archivo, { encoding: "utf-8" });
  const data: Data = JSON.parse(info);
  return data;
};
