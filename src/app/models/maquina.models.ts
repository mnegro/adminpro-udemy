export class Maquina {

    constructor(
        public marca: string,
        public modelo: string,
        public serie: string,
        public alquilada: boolean,
        public precioCopia?: number,
        public contador?: number,
        public descripcion?: string,
        public accesorios?: string,
        public cliente?: string,
        public _id?: string
    ) { }
}
