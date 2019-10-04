import { Maquina } from './maquina.models';
export class DetalleAlquiler {

    constructor (
        public contadorActual: number,
        public cantidadCopias: number,
        public precio: number,
        public maquina?: Maquina,
        public _id?: string
    ) { }

}