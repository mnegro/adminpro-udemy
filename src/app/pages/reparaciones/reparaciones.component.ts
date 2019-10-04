import { Component, OnInit } from '@angular/core';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { ReparacionService } from '../../services/reparacion/reparacion.service';
import { Reparacion } from 'src/app/models/reparacion.model';
import { ActivatedRoute,Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ModalDetalleService } from '../../components/modal-detalle/modal-detalle.service';

@Component({
  selector: 'app-reparaciones',
  templateUrl: './reparaciones.component.html',
  styles: []
})
export class ReparacionesComponent implements OnInit {

  cargando: boolean= true;
  reparaciones: Reparacion[] = [];
  public repuestos:any []=[];
  public reemplazo: Reparacion;
  idMaquina;

  constructor(
      public _maquinaService: MaquinaService,
      public _reparacionesService: ReparacionService,
      public _modalDetalleService: ModalDetalleService,
      public activatedRoute: ActivatedRoute,
      public router: Router

    ) { 
      
    }

  ngOnInit() {
    this.obtenerId();
 }

 obtenerId(){
  this.activatedRoute.params.subscribe( params =>{
    let idMaquina= params['id'];
    this.idMaquina = idMaquina;
    this._reparacionesService.maquinaid = idMaquina;
    if( idMaquina !== 'nuevo' ){
      this.cargarReparaciones( idMaquina );

    }

  })
 }

 cargarReparaciones(id: string ){
   this.cargando= true;
   this._reparacionesService.cargarReparacionesMaquina( id )
           .subscribe( resp => {
             this.reparaciones = resp;
             this.cargando = false;
           });
 }
  
  borrarReparacion( reparacion: Reparacion){
    if( reparacion.facturada ){
      swal('Denegado','Esta reparacion se encuentra facturada,por lo tanto no puede ser eliminada','error')
    }else{
      this._reparacionesService.borrarReparacion( reparacion._id )
           .subscribe( (resp:any) =>{
             this.cargarReparaciones(resp.reparacion.maquina);
             });
    }
   
  }

  verDetalle(reparacion: any,ver: string){
    this._modalDetalleService.mostrarModal(reparacion, ver);

  }

  buscarCambio( termino: string ){
    if( termino.length <= 0 ){  
      this.cargarReparaciones(this.idMaquina);
      return;
    }
      this._reparacionesService.buscarReparacion( this.idMaquina, termino )
        .subscribe( resp => this.reparaciones = resp );
  }
  

}


