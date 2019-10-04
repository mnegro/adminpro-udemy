
export class Cheque {

    constructor (
       public fecha: Date,
       public banco: string,
       public numero: number,
       public detalle: string,
       public importe: number
    ) { }

}