import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Saldo } from '../../models/saldo.models';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  totalRegistros: number;
  saldoSeleccionado: Saldo;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

cargarSaldos( desde: number ){

  let url= URL_SERVICIOS + '/saldo/paginado/'+ desde;
  url+= '?token=' + this._usuarioService.token;

  return this.http.get( url )
          .pipe( map( (resp:any) => {

              this.totalRegistros = resp.Total;
              return resp.saldos;
          }));
}
buscarSaldo( termino: string ){

  let url = URL_SERVICIOS + '/busqueda/coleccion/saldos/' + termino;

  return this.http.get( url )
              .pipe( map( (resp: any) => resp.saldos));

}

borrarSaldo( id: string ){
  
  let url= URL_SERVICIOS + '/saldo/' + id;
  url+= '?token=' + this._usuarioService.token;

  return this.http.delete( url )
          .pipe( map( resp => {
            swal('Cliente Borrado','Cliente borrado correctamente','succes');
            return resp;
          }));
}
cargarSaldosdesde(id: string, desde: number = 0){

  let url= URL_SERVICIOS + '/saldo/cliente/paginado/' + id;
  url += '?desde=' + desde;

  return this.http.get( url )
          .pipe( map( (resp:any) => {
            this.totalRegistros = resp.Total;
            return resp.saldos 
          }));
}

guardarSaldo( saldo: Saldo ){
  
  let url= URL_SERVICIOS + '/saldo';

  if( saldo._id ){
    // actualizo
    url+= '/' + saldo._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, saldo )
          .pipe( map( (resp:any) => {
            swal('Saldo actualizado','','success');
            return resp.saldo;
          }));

  }else{
    // creo
    this.agregarAcuenta(saldo);
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, saldo )
        .pipe( map( (resp:any)=>{

          swal('Saldo creado','','success');
          return resp.saldo;
        }));
  }

  
}

agregarAcuenta(saldo:Saldo){
  console.log('service');
  let url= URL_SERVICIOS + '/ctaCorriente';
  url += '?token=' + this._usuarioService.token;
  return this.http.post( url, saldo )
      .pipe( map( (resp:any)=>{
         console.log(resp);
        swal('Saldo creado','','success');
        return resp.cuenta;
      }));
}

cargarSaldo( id: string ){
  let url= URL_SERVICIOS + '/saldo/' + id;
  url += '?token=' + this._usuarioService.token;
  return this.http.get( url )
          .pipe( map( (resp:any) => resp.saldo ));
}
cargarSaldoCliente( clienteid: string ){
  let url= URL_SERVICIOS + '/saldo/cliente/' + clienteid;
  url += '?token=' + this._usuarioService.token;
  return this.http.get( url )
          .pipe( map( (resp:any) => resp.saldos ));
}

buscarPorFecha( idCliente: string, desde: Date, hasta:Date ){
  let url= URL_SERVICIOS + '/saldo/saldo/' + idCliente +'/'+desde+'/'+hasta;
  url += '?token=' + this._usuarioService.token;
  return this.http.get( url )
          .pipe( map( (resp:any) => {
            this.totalRegistros = resp.Total;
           return resp.saldos 
          }));
}
}