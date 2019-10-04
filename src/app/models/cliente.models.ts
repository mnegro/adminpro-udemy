export class Cliente {

    constructor (
        public nombre: string,
        public apellido: string,
        public cuit: string,
        public localidad: string,
        public direccion: string,
        public email: string,
        public _id?: string
    ) { }

}