import { Component, OnInit } from '@angular/core';
import { Repuesto } from 'src/app/models/repuesto.model';
import { RepuestoService } from '../../services/repuesto/repuesto.service';
import { ModalDetalleService } from '../../components/modal-detalle/modal-detalle.service';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styles: []
})
export class RepuestosComponent implements OnInit {

  cargando: boolean= true;
  repuestos: Repuesto[] = [];
  desde: number =0;

  constructor( 
    public _repuestoService: RepuestoService,
    public _modalDetalleService: ModalDetalleService
     ) { }

  ngOnInit() {
    this.cargarRepuestos();
 }

 cargarRepuestos(){
   this.cargando= true;
   this._repuestoService.cargarRepuestos( this.desde )
           .subscribe( resp => {
             this.cargando= false;
             this.repuestos = resp;
           });
 }
  buscarRepuesto( termino: string){
    if( termino.length <= 0 ){
      this.cargarRepuestos();
      return;
    }
  
    this.cargando = true;
  
    this._repuestoService.buscarRepuesto( termino )
            .subscribe( (repuestos: Repuesto[]) => {
              this.repuestos = repuestos;
              this.cargando = false;  
            });
  } 
  verDetalle(repuesto: any,ver: string){
    this._modalDetalleService.mostrarModal(repuesto, ver);
  
  } 
  borrarRepuesto( repuesto: Repuesto){
    this._repuestoService.borrarRepuesto( repuesto._id )
            .subscribe( () => this.cargarRepuestos());
  }

  cambiarDesde( valor: number ){

    let desde = this.desde + valor;
   
    if( desde > this._repuestoService.totalRegistros ||  desde < 0 ){
     
      return;
    }else{
      this.desde += valor;
      this.cargarRepuestos();
    }

    
  }
}