import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.models';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalRegistros: number;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

cargarMedicos(){

  let url= URL_SERVICIOS + '/medico';

  return this.http.get( url )
          .pipe( map( (resp:any) => {

              this.totalRegistros = resp.Total;
              return resp.medicos;
          }));
}

buscarMedicos( termino: string ){

  let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

  return this.http.get( url )
              .pipe( map( (resp: any) => resp.medicos));

}

borrarMedico( id: string ){
  
  let url= URL_SERVICIOS + '/medico/' + id;
  url+= '?token=' + this._usuarioService.token;

  return this.http.delete( url )
          .pipe( map( resp => {
            swal('Medico Borrado','Medico borrado correctamente','succes');
            return resp;
          }));
}

guardarMedico( medico: Medico ){
  
  let url= URL_SERVICIOS + '/medico';

  if( medico._id ){
    // actualizo
    url+= '/' + medico._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, medico )
          .pipe( map( (resp:any) => {
            swal('Medico actualizado', medico.nombre,'success');
            return resp.medico;
          }));

  }else{
    // creo
    url += '?token=' + this._usuarioService.token;

  return this.http.post( url, medico )
        .pipe( map( (resp:any)=>{

          swal('Medico Creado', medico.nombre,'success');
          return resp.medico;
        }));
  }

  
}

cargarMedico( id: string ){
  let url= URL_SERVICIOS + '/medico/' + id;

  return this.http.get( url )
          .pipe( map( (resp:any) => resp.medico ));
}

}
