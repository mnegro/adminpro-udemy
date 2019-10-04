import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaldoService } from '../../services/saldo/saldo.service';
import { Saldo } from 'src/app/models/saldo.models';
import { ModalDetalleService } from '../../components/modal-detalle/modal-detalle.service';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styles: []
})
export class SaldosComponent implements OnInit {
  
  cargando: boolean= false;
  saldos: Saldo[]=[];
  totalRegistros = 0;
  id: string;
  desde: number =0;
  fechaDesde: Date;
  fechaFin: Date;

  constructor(
    // public _facturaService: FacturaService,
    public _saldosServices: SaldoService,
    public activatedRoute: ActivatedRoute,
    public _modalDetalleService: ModalDetalleService,
    public router: Router,

    
  ) { 
    this.totalRegistros = this._saldosServices.totalRegistros;
    activatedRoute.params.subscribe( params =>{

      let id= params['id'];
      this.id = id;
      if( id !== 'nuevo' ){
        this.cargarSaldosCliente();
      }
    })
  }
  ngOnInit() {
  }
   
  cargarSaldosCliente(){
    this._saldosServices.cargarSaldosdesde(this.id, this.desde )
        .subscribe( saldos => {
          if( saldos === undefined ){
            this.saldos.length =0;
          }else{
            this.saldos = saldos;

          }
        })
  }
  verDetalle(saldo: Saldo){
    this._saldosServices.saldoSeleccionado = saldo;
    this.router.navigate(['/detalle-pago']);  
  }
agregarPago(){
  this.router.navigate(['/saldo','nuevo',this.id]);
}
buscarFecha(){
  if( this.fechaDesde === undefined || this.fechaFin === undefined ){
    swal('Ingrese rango de fechas','Debe ingresar un rango de fecha valido para la busqueda','warning');
  }else if( this.fechaFin < this.fechaDesde ){
    swal('Rango de fechas incorrecto','','warning');

  }else{
    this._saldosServices.buscarPorFecha(this.id, this.fechaDesde,this.fechaFin)
   .subscribe( saldos =>{
        this.saldos = saldos;
   });
  }
  
}
  cambiarDesde( valor: number ){

    let desde = this.desde + valor;
   
    if( desde > this._saldosServices.totalRegistros ||  desde < 0 ){
     
      return;
    }else{
      this.desde += valor;
      this.cargarSaldosCliente();
    }

    
  }
}
