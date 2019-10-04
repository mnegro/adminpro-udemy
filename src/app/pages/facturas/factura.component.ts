import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from '../../models/cliente.models';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { Maquina } from '../../models/maquina.models';
import { Factura } from '../../models/factura';
import { DetalleAlquiler } from '../../models/detalleAlquiler';
import { FacturaService } from '../../services/factura/factura.service';
import { Router } from '@angular/router';
import { ReparacionService } from '../../services/reparacion/reparacion.service';
import { Reparacion } from '../../models/reparacion.model';
import { ModalDetalleService } from '../../components/modal-detalle/modal-detalle.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: []
})
export class FacturaComponent implements OnInit {

  cargando: boolean= false;
  clientes:Cliente[]=[];
  clienteSeleccionado: Cliente;
  maquinasAlquiladas: Maquina[]=[];
  mostrarAlquiladas: boolean = false;
  maquinasCliente: Maquina[]=[];
  mostrarCliente: boolean = false;
  aFacturar: Reparacion[]=[];
  preFactura: Reparacion []=[];
  factura: Factura = new Factura(new Date,[],false,0,[],this.clienteSeleccionado,0);
  listadoDetalle: any[]=[];
  detalle: DetalleAlquiler = new DetalleAlquiler(0,0,0,);
  

  constructor(
    public _clienteService: ClienteService,
    public _maquinasService: MaquinaService,
    public _facturaService: FacturaService,
    public _reparacionService: ReparacionService,
    public _modalDetalleService: ModalDetalleService,
    public router: Router,
  ) { }

  ngOnInit() {
   this.clientes=[];
   this.maquinasAlquiladas =[];
   this.maquinasCliente =[];
   this.aFacturar =[];
   this.listadoDetalle=[];
  }

  buscarCliente( termino: string ){
    this.cargando = true;
    if( termino.length <= 0 ){
      this.clientes = [];
      this.cargando = false;
    }else{
      this._clienteService.buscarCliente( termino )
          .subscribe( resp => {
            this.clientes = resp ;
            this.cargando = false;

          });
        }
  }
  buscarMaquinas( id: string ){
    this._maquinasService.cargarMaquinaCliente( id )
            .subscribe( maquinas => {
              for (let i = 0; i < maquinas.length; i++) {
                if( maquinas[i].alquilada == true ){
                  this.maquinasAlquiladas.push(maquinas[i]);
                }
                else{
                  this.maquinasCliente.push(maquinas[i]);  
                }
              }                  
            
                
            })
  }
  agregarCliente( cliente: Cliente ){
      this.clienteSeleccionado = cliente;
      this.buscarMaquinas( cliente._id );
      this.clientes=[];
  }
  calcularCopias( contActual:number, maquina: Maquina ){
    var existe: Maquina = this.listadoDetalle.find(x => x.maquina._id == maquina._id );
    if( existe ){
      swal('Ya calculado','El contador de la maquina: '+ maquina.modelo +'ya se ha calculado', 'warning');
      return;
    }
      if( contActual < maquina.contador || existe ){
        swal('Error','El contador actual debe ser mayor al anterior','warning');
        return;
      }else{
         var detalle = new Object({
           contadorActual: contActual,
           cantidadCopias: contActual - maquina.contador,
           precio: (contActual - maquina.contador) * maquina.precioCopia,
           maquina: maquina
         });
         this.listadoDetalle.push(detalle);
          
        }
          
    }

    agregaFactura( reparacion: Reparacion ){
      var existe: Reparacion = this.preFactura.find(x => x._id == reparacion._id );
      if( existe ){
        swal('Duplicado!','Ya se encuentra en la lista esa reparacion', 'warning');
        return;
         
    }else{
      this.preFactura.push( reparacion );
    }
  }
      facturar(){
        var suma =0;
        var tipo: string;

          if( this.maquinasAlquiladas.length >0 ){
            if( this.listadoDetalle.length <= 0 ){
              swal('Error','Debe ingresar contadores para calcular','error');
              return;
            }else{
              for( let i=0; i<this.listadoDetalle.length; i++ ){
                suma =  suma + this.listadoDetalle[i].precio;
              }
                  this.factura.fecha = new Date();
                  this.factura.detalle = this.listadoDetalle;
                  this.factura.reparacion = null;
                  this.factura.cliente = this.clienteSeleccionado;
                  this.factura.total = suma;
                  tipo = 'alquilada';
            }
           

          }if( this.maquinasCliente.length >0 ){
            if( this.preFactura.length <= 0 ){
              swal('Error','Debe ingresar reparaciones para facturar','error');
              return;
            }else{
              for( let i=0; i<this.preFactura.length; i++ ){
                suma =  suma + this.preFactura[i].total;
              }
                  this.factura.fecha = new Date();
                  this.factura.detalle = null;
                  this.factura.reparacion = this.preFactura;
                  this.factura.cliente = this.clienteSeleccionado;
                  this.factura.total = suma;
                  tipo = 'cliente';
            }
            }
         if(this.clienteSeleccionado == null ){
           swal('Ingrese Dato','Debe buscar un cliente','error');
        }else{
          this._facturaService.guardarFactura( this.factura, tipo )
                 .subscribe( factura => {
                 this.router.navigate(['/facturas', factura.cliente._id]);
          });

        }
        
  }

  verFacturas( maquina: Maquina ){
      this._reparacionService.cargarReparacionesMaquina ( maquina._id )
              .subscribe( reparaciones =>{
                for (let i = 0; i < reparaciones.length; i++) {
                  if( reparaciones[i].facturada === false ){
                    this.aFacturar.push( reparaciones[i] );
                  }
                                    
                }
               
              })
  }

  verDetalle(reparacion: any,ver: string){
    console.log( reparacion );
    this._modalDetalleService.mostrarModal(reparacion, ver);

  }

  eliminarDetalle(i){
    this.listadoDetalle.splice(i,1);
  }

  eliminarItem(i){
    this.preFactura.splice(i,2);
  }

  mostrarAlq(){
    this.mostrarAlquiladas = true;
    this.mostrarCliente = false;
    this.maquinasCliente=[];
  }
  mostrarCli(){
    this.mostrarCliente = true;
    this.mostrarAlquiladas = false;
    this.maquinasAlquiladas = [];
  }

}

 
