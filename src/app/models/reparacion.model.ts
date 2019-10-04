import { Repuesto } from './repuesto.model';
import { Reemplazo } from './reemplazo.models';
export class Reparacion {

    constructor (
        public descripcion: string,
        public maquina: string,
        public facturada?: boolean,
        public repuestos?:Reemplazo[],
        public total?: number,
        public fecha?: Date,
        public contador?: string,
        public _id?: string
    ) { }

}