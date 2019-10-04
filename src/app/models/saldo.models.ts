
export class Saldo {

    constructor (
        public fecha: Date,
        public importeTotal: number,
        public pago: any[]=[],
        public cliente: string,
        public _id?: string
    ) { }

}