import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Hospital } from '../../models/hospital.models';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalRegistros: number =0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales(){
    let url: string = URL_SERVICIOS + '/hospital'
    return this.http.get( url )
            .pipe( map((resp:any) =>{
                this.totalRegistros = resp.Total;
                return resp.hospitales;
            } ))
  }

  obtenerHospital( id: string ){
      let url = URL_SERVICIOS + '/hospital/' + id;
      return this.http.get( url )
          .pipe( map ((resp: any) =>  resp.hospital));
  }

  borrarHospital( id: string ){
    let url: string = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
        .pipe( map( resp => swal('Hospital Eliminado', 'Eliminado correctamente', 'success')));
  }

  crearHospital( nombre: string ){
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
     return this.http.post( url, {nombre: nombre} )
            .pipe( map  ((resp:any) => resp.hospital ));
  }

  buscarHospitales( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

  return this.http.get( url )
              .pipe( map( (resp: any) => resp.hospitales));
  }

  actualizarHospital( hospital: Hospital ){
      let url = URL_SERVICIOS + '/hospital/' + hospital._id;
      url+= '?token=' + this._usuarioService.token;

      return this.http.put( url, hospital )
              .pipe( map( (resp:any) => {
                swal('Hospital actualizado',hospital.nombre,'success');
                return resp.hospital;
               }));
  }

}

