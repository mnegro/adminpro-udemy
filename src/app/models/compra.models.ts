export class Compra {

    constructor(
        public repuesto: string,
        public proveedor: string,
        public cantidad: number,
        public costoUnidad: number,
        public fechaCompra: Date,
        public costoTotal?: number, 
        public _id?: string
    ) { }
}
