import inquirer from "inquirer";
import Tarea from "../models/tarea"; // Corrección en la importación del tipo Tarea
import "colors";

interface Pregunta {
  type: string;
  name: string;
  message: string;
  validate?: (value: string) => boolean | string;
  choices?: { value: string; name: string; checked?: boolean }[]; // Añadido el tipo de choices
}

const preguntas: Pregunta[] = [
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

const pausa = async (): Promise<void> => {
  const question: Pregunta[] = [
    {
      type: "input",
      name: "enter",
      message: `presione ${"enter"} para continuar`,
    },
  ];
  await inquirer.prompt(question);
};

const inquirerMenu = async (): Promise<string> => {
  console.clear();
  console.log("=====================".green);
  console.log("Seleccione una opción".bgMagenta);
  console.log("=====================".green);

  const { option } = await inquirer.prompt(preguntas);
  await pausa();

  return option;
};

const leerInput = async (message: string): Promise<string> => {
  const question: Pregunta[] = [
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
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas: Tarea[]): Promise<string> => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return { value: tarea.id, name: `${idx} ${tarea.desc}` }; // Corrección en la definición de choices
  });
  choices.unshift({ value: "0", name: `${"0.".green} Cancelar` }); // Corrección en la definición de choices
  const preguntas: Pregunta[] = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message: string): Promise<boolean> => {
  const question: Pregunta[] = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const mostrarListadoCheckList = async (tareas: Tarea[]): Promise<string[]> => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const preguntas: Pregunta[] = [
    {
      type: "checkbox",
      name: "tareas",
      message: "Seleccione",
      choices,
    },
  ];

  const { tareas: ids } = await inquirer.prompt(preguntas);
  return ids.map((id: string) => id);
};

export {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
};
