import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Repuesto } from 'src/app/models/repuesto.model';

@Injectable({
  providedIn: 'root'
})
export class RepuestoService {
  totalRegistros: number;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

cargarRepuestos( desde: number ){

  let url= URL_SERVICIOS + '/repuesto';
  url += '?desde=' + desde;

  return this.http.get( url )
          .pipe( map( (resp:any) => {

              this.totalRegistros = resp.Total;
              return resp.repuestos;
          }));
}
buscarRepuesto( termino: string ){

  let url = URL_SERVICIOS + '/busqueda/coleccion/repuestos/' + termino;

  return this.http.get( url )
              .pipe( map( (resp: any) => resp.repuestos));

}

cargarRepuestosdesde(id: string, desde: number = 0){

  let url= URL_SERVICIOS + '/repuesto/' + id;
  url += '?desde=' + desde;

  return this.http.get( url )
          .pipe( map( (resp:any) => {
            this.totalRegistros = resp.Total;
            return resp.facturas 
          }));
}

borrarRepuesto( id: string ){
  
  let url= URL_SERVICIOS + '/repuesto/' + id;
  url+= '?token=' + this._usuarioService.token;

  return this.http.delete( url )
          .pipe( map( resp => {
            swal('Repuesto Borrado','Repuesto borrado correctamente','succes');
            return resp;
          }));
}

guardarRepuesto( repuesto: Repuesto ){
  
  let url= URL_SERVICIOS + '/repuesto';

  if( repuesto._id ){
    // actualizo
    url+= '/' + repuesto._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, repuesto )
          .pipe( map( (resp:any) => {
            swal('Repuesto actualizado', repuesto.codigo,'success');
            return resp.cliente;
          }));

  }else{
    // creo
    url += '?token=' + this._usuarioService.token;
  return this.http.post( url, repuesto )
        .pipe( map( (resp:any)=>{

          swal('Repuesto Creado', repuesto.codigo,'success');
          return resp.repuesto;
        }));
  }

  
}

devuelveStock( repuesto ){
  let url= URL_SERVICIOS + '/repuesto/devuelve/repuesto';
  return this.http.put( url, repuesto )
        .pipe( map( (resp:any)=>{

          return resp.repuesto;
        }));
}
quitaeStock( repuesto ){
  let url= URL_SERVICIOS + '/repuesto/quita/repuesto';
  return this.http.put( url, repuesto )
        .pipe( map( (resp:any)=>{

          return resp.repuesto;
        }));
}

cargarRepuesto( id: string ){
  let url= URL_SERVICIOS + '/repuesto/' + id;
  url += '?token=' + this._usuarioService.token;
  return this.http.get( url )
          .pipe( map( (resp:any) => resp.repuesto ));
}
}