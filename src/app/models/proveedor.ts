export class Proveedor {

    constructor (
        public empresa: string,
        public localidad?: string,
        public cuit?: string,
        public direccion?: string,
        public email?: string,
        public _id?: string
    ) { }

}