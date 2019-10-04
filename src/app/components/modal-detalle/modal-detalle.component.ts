import { Component, OnInit } from '@angular/core';
import { ModalDetalleService } from './modal-detalle.service';
import { Reparacion } from '../../models/reparacion.model';
import { Factura } from '../../models/factura';
import { Repuesto } from '../../models/repuesto.model';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.component.html',
  styles: []
})
export class ModalDetalleComponent implements OnInit {

  reparacion: Reparacion;
  factura: Factura;
    constructor(
    public _modaldetalle: ModalDetalleService
  ) { }

  ngOnInit() {
   
  }

  verDetalle(reparacion: any,ver: string){
    this.cerrarModal();
    this._modaldetalle.mostrarModal(reparacion, ver);

  }

  cerrarModal(){
  
    this._modaldetalle.ocultarModal();
  }
}
