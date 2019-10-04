import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Proveedor } from 'src/app/models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  totalRegistros: number;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

cargarProveedores(){

  let url= URL_SERVICIOS + '/proveedor';
  url+= '?token=' + this._usuarioService.token;

  return this.http.get( url )
          .pipe( map( (resp:any) => {

              this.totalRegistros = resp.Total;
              return resp.proveedores;
          }));
}
buscarProveedor( termino: string ){

  let url = URL_SERVICIOS + '/busqueda/coleccion/proveedores/' + termino;

  return this.http.get( url )
              .pipe( map( (resp: any) => resp.proveedores));

}

borrarProveedor( id: string ){
  
  let url= URL_SERVICIOS + '/proveedor/' + id;
  url+= '?token=' + this._usuarioService.token;

  return this.http.delete( url )
          .pipe( map( resp => {
            swal('Proveedor Borrado','Proveedor borrado correctamente','success');
            return resp;
          }));
}

guardarProveedor( proveedor: Proveedor ){
  
  let url= URL_SERVICIOS + '/proveedor';

  if( proveedor._id ){
    // actualizo
    url+= '/' + proveedor._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, proveedor )
          .pipe( map( (resp:any) => {
            swal('Proveedor actualizado', proveedor.empresa,'success');
            return resp.proveedor;
          }));

  }else{
    // creo
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, proveedor )
        .pipe( map( (resp:any)=>{

          swal('Proveedor Creado', proveedor.empresa,'success');
          return resp.proveedor;
        }));
  }

  
}

cargarProveedor( id: string ){
  let url= URL_SERVICIOS + '/proveedor/' + id;
  url += '?token=' + this._usuarioService.token;
  return this.http.get( url )
          .pipe( map( (resp:any) => resp.proveedor ));
}
}
