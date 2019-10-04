export class Reemplazo {

    constructor ( 
        public detalle: string,
        public tipo: string,      
        public condicion: string,
        public cantidad: number,
        public stock: number,
        public cantidadEditar: number = 0,
        public _id?: string
        
    ) { }

}