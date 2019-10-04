import { Injectable, EventEmitter } from '@angular/core';
import { Reparacion } from '../../models/reparacion.model';
import { Factura } from '../../models/factura';
import { Cliente } from '../../models/cliente.models';
import { Repuesto } from '../../models/repuesto.model';
import { Maquina } from '../../models/maquina.models';
import { Saldo } from '../../models/saldo.models';

@Injectable({
  providedIn: 'root'
})
export class ModalDetalleService {

  public reparacion: Reparacion = new Reparacion('','');
  public repuesto: Repuesto = new Repuesto('','','',0);
  public cliente: Cliente = new Cliente('','','','','','');
  public maquina: Maquina = new Maquina('','','',false,0,0,'','','');
  public reparaciones: Reparacion[] = new Array();
  public factura: Factura = new Factura(new Date(),[],false,0,[],null,0);
  public oculto: string= 'oculto';
  public ocultoDescripcion: string ='ocultoDescripcion';
  public ocultoFacturaAlquilada: string ='ocultoFacturaAlquilada';
  public ocultoFacturaCliente: string ='ocultoFacturaCliente';
  public ocultoCliente: string ='ocultoCliente';
  public ocultoRepuesto: string ='ocultoRepuesto';
  public ocultoMaquina: string ='ocultoMaquina';
  public notificacion = new EventEmitter<any>();

  constructor() {
    
   }

   ocultarModal(){
    this.oculto='oculto';
    this.ocultoDescripcion='ocultoDescripcion';
    this.ocultoFacturaAlquilada='ocultoFacturaAlquilada';
    this.ocultoFacturaCliente='ocultoFacturaCliente';
    this.ocultoCliente='ocultoCliente';
    this.ocultoRepuesto='ocultoRepuesto';
    this.ocultoMaquina='ocultoMaquina';
    this.reparaciones = []; 
    
   }

   mostrarModal( object:any,ver: string ){

    switch( ver ){
          case 'repuestos':
              this.reparacion = object;
              this.oculto='';
         break;

         case 'detalle':
            this.reparacion = object;
            this.ocultoDescripcion='';
         break;

         case 'facturaAlquilada':
            this.factura = object;
            this.ocultoFacturaAlquilada='';
         break;

         case 'cliente':
            this.cliente = object;
            this.ocultoCliente='';
         break;

         case 'facturaCliente':
            for (let i = 0; i< object.length; i++) {
                  this.reparaciones.push(object[i]);
            }
            this.ocultoFacturaCliente='';
         break;

         case 'repuesto':
             this.repuesto = object;      
             this.ocultoRepuesto='';
         break;

         case 'maquina':
             this.maquina = object;
             this.maquina.cliente = object.cliente.nombre +' '+ object.cliente.apellido;      
             this.ocultoMaquina='';
         break;
       
      }
      

   }
}
