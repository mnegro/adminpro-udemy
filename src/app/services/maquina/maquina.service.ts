import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Maquina } from '../../models/maquina.models';
import { Cliente } from '../../models/cliente.models';
@Injectable({
  providedIn: 'root'
})
export class MaquinaService {

cliente: Cliente;
totalRegistros: number =0;
constructor(
  public http: HttpClient,
  public _usuarioService: UsuarioService
) { }
cargarMaquinas( desde: number ){

  let url= URL_SERVICIOS + '/maqina/paginado/'+ desde;
  url+= '?token=' + this._usuarioService.token;

  return this.http.get( url )
          .pipe( map( (resp:any) => {

              this.totalRegistros = resp.Total;
              return resp.maquinas;
          }));
}

buscarMaquina( termino: string ){

  let url = URL_SERVICIOS + '/busqueda/coleccion/maquinas/' + termino;

  return this.http.get( url )
              .pipe( map( (resp: any) => resp.maquinas));

}


borrarMaquina( id: string ){
  
  let url= URL_SERVICIOS + '/maqina/' + id;
  url+= '?token=' + this._usuarioService.token;

  return this.http.delete( url )
          .pipe( map( resp => {
            swal('Maquina Borrado','Maquina borrada correctamente','success');
            return resp;
          }));
}

guardarMaquina( maquina: Maquina ){
  
  let url= URL_SERVICIOS + '/maqina';

  if( maquina._id ){
    // actualizo

    url+= '/' + maquina._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, maquina )
          .pipe( map( (resp:any) => {
            swal('Maquina actualizada', maquina.modelo,'success');
            return resp.maquina;
          }));

  }else{
    // creo
    url += '?token=' + this._usuarioService.token;
    if( this.cliente != null ){
      maquina.cliente = this.cliente._id;
    }
  return this.http.post( url, maquina )
        .pipe( map( (resp:any)=>{

          swal('Maquina Creado', maquina.modelo,'success');
          return resp.maquina;
        }));
  }

  
}

cargarMaquina( maquinaid: string ){
  let url= URL_SERVICIOS + '/maqina/' + maquinaid;
  url += '?token=' + this._usuarioService.token;
  return this.http.get( url )
          .pipe( map( (resp:any) => resp.maquina ));
}

cargarMaquinaCliente( clienteid: string ){
  let url= URL_SERVICIOS + '/maqina/cliente/' + clienteid;
  url += '?token=' + this._usuarioService.token;
  return this.http.get( url )
          .pipe( map( (resp:any) => resp.maquina ));
}

}