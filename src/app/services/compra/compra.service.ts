import { Injectable } from '@angular/core';
import { Compra } from 'src/app/models/compra.models';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  compra: Compra;
  totalRegistros: number =0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }
  cargarCompras(){
  
    let url= URL_SERVICIOS + '/compra';
    url+= '?token=' + this._usuarioService.token;
  
    return this.http.get( url )
            .pipe( map( (resp:any) => {
  
                this.totalRegistros = resp.Total;
                return resp.compras;
            }));
  }
  
  buscarCompra( termino: string ){
  
    let url = URL_SERVICIOS + '/busqueda/coleccion/compras/' + termino;
  
    return this.http.get( url )
                .pipe( map( (resp: any) => resp.compra));
  
  }
  
  borrarCompra( id: string ){
    
    let url= URL_SERVICIOS + '/compra/' + id;
    url+= '?token=' + this._usuarioService.token;
  
    return this.http.delete( url )
            .pipe( map( resp => {
              swal('Compra Borrada','Compra borrada correctamente','success');
              return resp;
            }));
  }
  
  guardarCompra( compra: Compra ){
    
    let url= URL_SERVICIOS + '/compra';
  
    if( compra._id ){
      // actualizo
      url+= '/' + compra._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put( url, compra )
            .pipe( map( (resp:any) => {
              swal('Compra actualizada','Se actualizo correctamente','success');
              return resp.maquina;
            }));
  
    }else{
      // creo
      url += '?token=' + this._usuarioService.token;
  
    return this.http.post( url, compra )
          .pipe( map( (resp:any)=>{
  
            swal('Compra Creado','Nueva compra realizada','success');
            return resp.compra;
          }));
    }
  
    
  }
  cargarCompra( compraid: string ){
    let url= URL_SERVICIOS + '/compra/' + compraid;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
            .pipe( map( (resp:any) => resp.compra ));
  }
  
  }