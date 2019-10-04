import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Cliente } from '../../models/cliente.models';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  totalRegistros: number;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

cargarClientes( desde: number ){

  let url= URL_SERVICIOS + '/cliente/paginado/'+ desde;
  url+= '?token=' + this._usuarioService.token;

  return this.http.get( url )
          .pipe( map( (resp:any) => {

              this.totalRegistros = resp.Total;
              return resp.clientes;
          }));
}
buscarCliente( termino: string ){

  let url = URL_SERVICIOS + '/busqueda/coleccion/clientes/' + termino;

  return this.http.get( url )
              .pipe( map( (resp: any) => resp.clientes));

}

borrarCliente( id: string ){
  
  let url= URL_SERVICIOS + '/cliente/' + id;
  url+= '?token=' + this._usuarioService.token;

  return this.http.delete( url )
          .pipe( map( resp => {
            swal('Cliente Borrado','Cliente borrado correctamente','succes');
            return resp;
          }));
}

guardarCliente( cliente: Cliente ){
  
  let url= URL_SERVICIOS + '/cliente';

  if( cliente._id ){
    // actualizo
    url+= '/' + cliente._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, cliente )
          .pipe( map( (resp:any) => {
            swal('Cliente actualizado', cliente.nombre,'success');
            return resp.cliente;
          }));

  }else{
    // creo
    url += '?token=' + this._usuarioService.token;
  return this.http.post( url, cliente )
        .pipe( map( (resp:any)=>{

          swal('Cliente Creado', cliente.nombre,'success');
          return resp.cliente;
        }));
  }

  
}

cargarCliente( id: string ){
  let url= URL_SERVICIOS + '/cliente/' + id;
  url += '?token=' + this._usuarioService.token;
  return this.http.get( url )
          .pipe( map( (resp:any) => resp.cliente ));
}
}