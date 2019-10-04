import { Component, OnInit } from '@angular/core';
import { Maquina } from 'src/app/models/maquina.models';
import { MaquinaService } from '../../services/maquina/maquina.service';
import { ModalDetalleService } from '../../components/modal-detalle/modal-detalle.service';

@Component({
  selector: 'app-maquinas',
  templateUrl: './maquinas.component.html',
  styles: []
})
export class MaquinasComponent implements OnInit {

  maquina: Maquina = new Maquina('','','',false);
  
  cargando: boolean= true;
  maquinas: Maquina[] = [];
  desde: number =0;

  constructor( 
    public _maquinaService: MaquinaService,
    public _modalDetalleService: ModalDetalleService ) { }

  ngOnInit() {
    this.cargarMaquinas();
 }

 cargarMaquinas(){
   this.cargando= true;
   this._maquinaService.cargarMaquinas( this.desde )
           .subscribe( resp => {
             this.cargando= false;
             this.maquinas = resp;
           });
 }
  buscarMaquina( termino: string){
    if( termino.length <= 0 ){
      this.cargarMaquinas();
      return;
    }
  
    this.cargando = true;
  
    this._maquinaService.buscarMaquina( termino )
            .subscribe( (maquinas: Maquina[]) => {
              this.maquinas = maquinas;
              this.cargando = false;  
            });
  }  
  verDetalle(maquina: any,ver: string){
    this._modalDetalleService.mostrarModal(maquina, ver);
  
  } 
  borrarMaquina( maquina: Maquina){
    this._maquinaService.borrarMaquina( maquina._id )
            .subscribe( () => this.cargarMaquinas());
  }

  cambiarDesde( valor: number ){

    let desde = this.desde + valor;
   
    if( desde > this._maquinaService.totalRegistros ||  desde < 0 ){
     
      return;
    }else{
      this.desde += valor;
      this.cargarMaquinas();
    }

    
  }
}

