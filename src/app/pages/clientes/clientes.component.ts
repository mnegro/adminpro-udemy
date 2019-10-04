import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente/cliente.service';
import { Cliente } from 'src/app/models/cliente.models';
import { ModalDetalleService } from '../../components/modal-detalle/modal-detalle.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  cargando: boolean= true;
  clientes: Cliente[] = [];
  desde: number =0;

  constructor(
    public _clienteService: ClienteService,
    public _modalDetalleService: ModalDetalleService

    ) { }

  ngOnInit() {
    this.cargarClientes();
 }

 cargarClientes(){
   this.cargando= true;
   this._clienteService.cargarClientes( this.desde )
           .subscribe( resp => {
             this.cargando= false;
             this.clientes = resp;
           });
 }
 verDetalle(cliente: any,ver: string){
  this._modalDetalleService.mostrarModal(cliente, ver);

}
buscarCliente( termino: string ){
  if( termino.length <= 0 ){
    this.cargarClientes();
    return;
  }

  this.cargando = true;

  this._clienteService.buscarCliente( termino )
          .subscribe( (clientes: Cliente[]) => {
            this.clientes = clientes;
            this.cargando = false;  
          });
}
  borrarCliente( cliente: Cliente){
    this._clienteService.borrarCliente( cliente._id )
            .subscribe( () => this.cargarClientes());
  }

  cambiarDesde( valor: number ){

    let desde = this.desde + valor;
   
    if( desde > this._clienteService.totalRegistros ||  desde < 0 ){
     
      return;
    }else{
      this.desde += valor;
      this.cargarClientes();
    }

    
  }
}
