import { Component, OnInit } from '@angular/core';
import { SaldoService } from 'src/app/services/saldo/saldo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Saldo } from 'src/app/models/saldo.models';
import { NgForm } from '@angular/forms';
import { Efectivo } from '../../models/efectivo';
import { Cheque } from '../../models/cheque';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styles: []
})
export class SaldoComponent implements OnInit {

  cargando: boolean= false;
  saldos: Saldo[]=[];
  saldo: Saldo= new Saldo(new Date,0,[],'');
  id: string;
  efectivo: Efectivo;
  cheque: Cheque = new Cheque(new Date,'',0,'',0);
  esefectivo:boolean = false;
  escheque:boolean = false;
  modalidad:string;
  desde: number =0;
  formasdePago =["Efectivo","Cheque"];
  constructor(
    public _saldosServices: SaldoService,
    public activatedRoute: ActivatedRoute,
    public router:Router
  ) { 
    activatedRoute.params.subscribe( params =>{

      let id= params['id'];
      this.id = id;
    
    })
  }

  ngOnInit() {
  }
  
  seleccionPago(f:string){
   if(this.modalidad == 'Efectivo'){
   this.efectivo = new Efectivo(0,'','');
       this.esefectivo= true;   
   }else if(this.modalidad == 'Cheque'){
         this.escheque= true;   

   }
  }
  agrgarEfectivo(f2:NgForm){
      if(f2.invalid){
        swal('Completar datos','Revise el formulario de efectivo, o cierrelo','warning');
        return;
      }
      if( this.esefectivo && this.efectivo != null ){
        console.log(this.efectivo.importe)
        this.saldo.pago.push(this.efectivo);
      }
      this.esefectivo = false;

  }
  agrgarCheque(f3:NgForm){
      if(f3.invalid){
          swal('Completar datos','Revise el formulario de Cheques, o cierelo','warning');
        return;
      }
      if( this.escheque && this.cheque != null ){
        this.saldo.pago.push(this.cheque);
        
      }
      this.escheque = false;
  }
  cerrarFormCheque(f3:NgForm){
    f3.resetForm();
    this.escheque = false;
  }
  cerrarFormEfectivo(f2: NgForm){
    f2.resetForm();
    this.esefectivo = false;
  }
  guardarSaldo( f: NgForm ){
    if( f.invalid ){
      return;
    }
    if( this.saldo.pago.length <=0 ){
      swal('Ingrese Pago','Debe especificar un monto y una forma de pago','error');
    }
    this.saldo.cliente=this.id;
    for (let i = 0; i < this.saldo.pago.length; i++) {
      this.saldo.importeTotal += this.saldo.pago[i].importe;
    }
    console.log(this.saldo);
    this._saldosServices.guardarSaldo( this.saldo )
          .subscribe( saldo =>{
            this.router.navigate(['/saldos',this.saldo.cliente]);
          });
  }
}
