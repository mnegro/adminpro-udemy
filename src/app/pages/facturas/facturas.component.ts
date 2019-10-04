import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/services/factura/factura.service';
import { Factura } from 'src/app/models/factura';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDetalleService } from '../../components/modal-detalle/modal-detalle.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: []
})
export class FacturasComponent implements OnInit {

  cargando: boolean= false;
  facturas: Factura[]=[];
  totalRegistros = 0;
  desde: number =0;
  id: string;
  fechaDesde: Date;
  fechaFin: Date;

  constructor(
    public _facturaService: FacturaService,
    public activatedRoute: ActivatedRoute,
    public _modalDetalleService: ModalDetalleService,
    public router: Router,

    
  ) { 
    this.totalRegistros = this._facturaService.totalRegistros;
    activatedRoute.params.subscribe( params =>{

      let id= params['id'];
      this.id = id;
      if( id !== 'nuevo' ){
        this.cargarFacturas();
      }
    })
  }

  ngOnInit() {
  }

  cargarFacturas(){
    this._facturaService.cargarFacturasdesde( this.id, this.desde )
            .subscribe( (facturas:any) =>{
              this.facturas = facturas
            });
  }

  verDetalle(factura: any,ver: string){
    this._modalDetalleService.mostrarModal(factura, ver);

  }
  
  buscarFecha(){
    if( this.fechaDesde === undefined || this.fechaFin === undefined ){
      swal('Ingrese rango de fechas','Debe ingresar un rango de fecha valido para la busqueda','warning');
    }else if( this.fechaFin < this.fechaDesde ){
      swal('Rango de fechas incorrecto','','warning');

    }else{
      this._facturaService.buscarPorFecha(this.id, this.fechaDesde,this.fechaFin)
     .subscribe( facturas =>{
          this.facturas = facturas;
     });
    }
    
  }

  cambiarDesde( valor: number ){

    let desde = this.desde + valor;
   
    if( desde > this._facturaService.totalRegistros ||  desde < 0 ){
     
      return;
    }else{
      this.desde += valor;
      this.cargarFacturas();
    }

    
  }


}
