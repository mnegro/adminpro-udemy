export class Repuesto {

    constructor ( 
        public detalle: string,
        public tipo: string,      
        public condicion: string,
        public stock: number,
        public marca?: string,
        public codigo?: string,
        public precio?: string,
        public _id?: string
        
    ) { }

}