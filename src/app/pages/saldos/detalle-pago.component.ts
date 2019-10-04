import { Component, OnInit } from '@angular/core';
import { Saldo } from '../../models/saldo.models';
import { SaldoService } from '../../services/saldo/saldo.service';
import { Efectivo } from '../../models/efectivo';
import { Cheque } from '../../models/cheque';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styles: []
})
export class DetallePagoComponent implements OnInit {
  
  saldo: Saldo;
  cargando: boolean= false;
  efectivos: Efectivo[]=[]; 
  cheques: Cheque[]=[]; 
  constructor(
    public _saldosServices: SaldoService,

  ) { 
    this.saldo = this._saldosServices.saldoSeleccionado;
  }

  ngOnInit() {
    this.detallar();
  }

  detallar(){
    for (let i = 0; i < this.saldo.pago.length; i++) {
      this.cargando = true;
          if( this.saldo.pago[i].moneda){
              this.efectivos.push(this.saldo.pago[i]);
          }else if( this.saldo.pago[i].numero){
            this.cheques.push(this.saldo.pago[i]);
          }      
    }
    this.cargando = false;

  }
}
