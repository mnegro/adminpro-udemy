import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Factura } from '../../models/factura';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  totalRegistros: number;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

cargarFacturas(){

  let url= URL_SERVICIOS + '/factura';
  url+= '?token=' + this._usuarioService.token;

  return this.http.get( url )
          .pipe( map( (resp:any) => {

              this.totalRegistros = resp.Total;
              return resp.facturas;
          }));
}
buscarFacturas( termino: string ){

  let url = URL_SERVICIOS + '/busqueda/coleccion/facturas/' + termino;

  return this.http.get( url )
              .pipe( map( (resp: any) => resp.facturas));

}

borrarFactura( id: string ){
  
  let url= URL_SERVICIOS + '/factura/' + id;
  url+= '?token=' + this._usuarioService.token;

  return this.http.delete( url )
          .pipe( map( resp => {
            swal('Factura Borrada','Factura borrada correctamente','succes');
            return resp;
          }));
}

guardarFactura( factura: Factura, tipo: string ){
  
  let url= URL_SERVICIOS + '/factura';

  if( factura._id ){
    // actualizo
    url+= '/' + factura._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, factura )
          .pipe( map( (resp:any) => {
            swal('Factura actualizada','Se actualizo correctamente','success');
            return resp.factura;
          }));

  }else{
    // creo
    url += '/' + tipo;
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, factura )
        .pipe( map( (resp:any)=>{

          swal('Factura creada', 'Factura creada correctamente','success');
          return resp.factura;
        }));
  }

  
}
cargarFacturasdesde(id: string, desde: number = 0){

  let url= URL_SERVICIOS + '/factura/cliente/' + id;
  url += '?desde=' + desde;

  return this.http.get( url )
          .pipe( map( (resp:any) => {
            this.totalRegistros = resp.Total;
            return resp.facturas; 
          }));
}

cargarFactura( id: string ){
  let url= URL_SERVICIOS + '/factura/cliente/' + id;
  url += '?token=' + this._usuarioService.token;
  return this.http.get( url )
          .pipe( map( (resp:any) => {
            this.totalRegistros = resp.Total;
            resp.facturas 
          }));
}

buscarPorFecha( idCliente: string, desde: Date, hasta:Date ){
  let url= URL_SERVICIOS + '/factura/factura/' + idCliente +'/'+desde+'/'+hasta;
  url += '?token=' + this._usuarioService.token;
  return this.http.get( url )
          .pipe( map( (resp:any) => {
            this.totalRegistros = resp.Total;
           return resp.facturas 
          }));
}
}
