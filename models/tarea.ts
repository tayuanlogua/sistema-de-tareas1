import { v4 as uuidv4 } from "uuid";

class Tarea {
  id: string;
  desc: string;
  completadoEn: Date | null;

  constructor(desc: string) {
    this.id = uuidv4();
    this.desc = desc;
    this.completadoEn = null;
  }
}

export default Tarea;
