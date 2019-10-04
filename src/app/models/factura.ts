import { Cliente } from './cliente.models';

export class Factura {

    constructor (
        public fecha: Date,
        public detalle: any[]=[],
        public paga: boolean = false,
        public aCuenta: number = 0,
        public reparacion: any[]=[],
        public cliente: Cliente,
        public total: number,
        public _id?: string
    ) { }

}