import { Injectable } from '@angular/core';
import { Reparacion } from 'src/app/models/reparacion.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { RepuestoService } from '../repuesto/repuesto.service';
import { Repuesto } from '../../models/repuesto.model';

@Injectable({
  providedIn: 'root'
})

export class ReparacionService {

  cliente: Reparacion;
  totalRegistros: number =0;
  maquinaid: string;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _repuestoService: RepuestoService
  ) { }
  cargarReparaciones(){
  
    let url= URL_SERVICIOS + '/reparacion';
    url+= '?token=' + this._usuarioService.token;
  
    return this.http.get( url )
            .pipe( map( (resp:any) => {
  
                this.totalRegistros = resp.Total;
                return resp.reparaciones;
            }));
  }
  
  buscarReparacion(idMaquina, termino: string ){
    
    let url = URL_SERVICIOS + '/reparacion/reparacion/' + idMaquina+'/' + termino;
    url+= '?token=' + this._usuarioService.token;
    return this.http.get( url )
                .pipe( map( (resp: any) => resp.reparacion));
  
  }
  
  borrarReparacion( id: string ){
    
    let url= URL_SERVICIOS + '/reparacion/' + id;
    url+= '?token=' + this._usuarioService.token;
    

    return this.http.delete( url )
            .pipe( map( resp => {
              swal('Reparacion Borrada','','success');
              return resp;
            }));
  }
  
  guardarReparacion( reparacion: Reparacion ){
    
    let url= URL_SERVICIOS + '/reparacion';
  
    if( reparacion._id ){
      // actualizo
      url+= '/' + reparacion._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, reparacion )
            .pipe( map( (resp:any) => {
              swal('Reparacion actualizada', '' ,'success');
              return resp.reparacion;
            }));
  
    }else{
      
      // creo
      url += '?token=' + this._usuarioService.token;
      reparacion.maquina = this.maquinaid;
    return this.http.post( url, reparacion )
          .pipe( map( (resp:any)=>{
            swal('Reparacion Creada', '' ,'success');
            return resp.reparacion;
          }));
    }
  
    
  }
  

  cargarReparacion( id: string ){
    let url= URL_SERVICIOS + '/reparacion/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
            .pipe( map( (resp:any) => resp.reparacion ));
  }

  cargarReparacionesMaquina( maquinaid: string ){
    this.maquinaid = maquinaid;
    let url= URL_SERVICIOS + '/reparacion/maquina/' + maquinaid;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
            .pipe( map( (resp:any) => {
              this.totalRegistros = resp.Total;
              return resp.reparaciones
            } ));
  }

  
  }