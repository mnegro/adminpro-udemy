import { Component, OnInit } from '@angular/core';
import { Reparacion } from 'src/app/models/reparacion.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReparacionService } from '../../services/reparacion/reparacion.service';
import { NgForm, NgModel } from '@angular/forms';
import { RepuestoService } from '../../services/repuesto/repuesto.service';
import { Repuesto } from 'src/app/models/repuesto.model';
import { Reemplazo } from '../../models/reemplazo.models';


@Component({
  selector: 'app-reparacion',
  templateUrl: './reparacion.component.html',
  styles: []
})
export class ReparacionComponent implements OnInit {

 
  reparacion: Reparacion = new Reparacion('','',false,[],0);
  reparaciones: Reparacion[] = [];
  repuestos: [] =[];
  searchValue: string = '';
  fecha: Date = new Date();
  editar: boolean = false;
  habilitarEdicion: boolean = false;
  repuestoBD:Repuesto;
  cantidadNueva =0;

  public cantidad: number = 1;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _reparacionService: ReparacionService,
    public _repuestoService: RepuestoService

  ) { 
    this.obtenerId();
  }

  ngOnInit() {
  }

  obtenerId(){
    let ID;
    this.activatedRoute.params.subscribe( params =>{

      let id= params['id'];
      ID = id;
      if( id !== 'nuevo' ){
        this.cargarReparacion( id );
        this.editar = true;
      }
      
    })
   return ID;
  }

  cargarReparacion( id: string ){

    this._reparacionService.cargarReparacion( id )
           .subscribe( reparacion => {
              this.reparacion = reparacion;
            });
     
  }
  buscarRepuesto( termino: string ){

    if( termino.length <= 0 ){
      this.repuestos = [];
      return;
    }
    this._repuestoService.buscarRepuesto (termino )
              .subscribe( repuestos => this.repuestos = repuestos );
  }

  verificaStock(repuesto:Reemplazo){
        if( repuesto.stock < repuesto.cantidad ){
        repuesto.cantidad = repuesto.stock -1;
        
        return swal('Stock Insuficiente','No hay suficiente stock','warning');
      }
      if( this.editar ){      
          this._repuestoService.cargarRepuesto(repuesto._id)
            .subscribe( resp => {
              this.repuestoBD= resp;
          if( repuesto.cantidadEditar > this.repuestoBD.stock){
            swal('Stock Insuficiente','No hay suficiente stock','warning');
            repuesto.cantidadEditar = 0;
            return repuesto;
          }
    
    });
    }
 
  }

  agregarRepuesto( repuesto: Repuesto){
   
   var existe: Repuesto = this.reparacion.repuestos.find(x => x._id == repuesto._id );
   if(existe){
    this.cantidad = 1;
    this.repuestos = [];
    this.clearSearch();
     return swal('Ya cargado','El repuesto ya se encuentra en la lista si desea puede modificarlo','warning');
    
   } if( this.editar ){
     this.cantidad = 0;
   }
        let reemplazo:any = new Object({
          _id: repuesto._id,
          tipo: repuesto.tipo,
          detalle: repuesto.detalle,
          condicion: repuesto.condicion,          
          cantidad: this.cantidad,
          stock: repuesto.stock,           
          precio: repuesto.precio,           
      });
         this.reparacion.repuestos.push(reemplazo);
         this.cantidad = 1;
         this.repuestos = [];
         this.clearSearch();
         
     
  }
  quitarRepuesto(i){
  this.reparacion.repuestos.splice(i,1);

  }

  eliminarRepuesto(reemplazo: Reemplazo,i,f: NgForm){
    
    this._repuestoService.devuelveStock(reemplazo)
        .subscribe( resp =>{
          this.quitarRepuesto(i);
          this.guardarReparacion(f);
        })
        

  }

  guardarReparacion( f: NgForm ){
    if( f.invalid ){
      return;
    }
   
    this.reparacion.fecha=this.fecha;
    this._reparacionService.guardarReparacion( this.reparacion )
          .subscribe( reparacion =>{
            this.router.navigate(['/reparaciones', reparacion.maquina]);
          });
  }
  clearSearch(){
    this.searchValue = null;
  }

  
}
