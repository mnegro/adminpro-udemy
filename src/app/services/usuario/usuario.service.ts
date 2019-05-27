import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.models';
import { URL_SERVICIOS } from '../../config/config';
import  swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  id: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoservice: SubirArchivoService
    )
   { 
    this.cargarStorage();
  }

  estaLogeado(){
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.id = localStorage.getItem('id');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    }else{
      this.token = '';
      this.usuario = null;
      this.id = '';
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario){

    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );  

    this.usuario= usuario;
    this.token= token;
    this.id= id;
  }

  logOut(){

    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

  loginGoogle( token: string ){

    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token })
            .pipe(
              map( (resp:any) =>{
                this.guardarStorage( resp.id, resp.token, resp.usuario );
                return true;
              })
            )
  }

  login ( usuario: Usuario, recordar: boolean = false ){
    
    if( recordar ){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
                .pipe(
                  map( (resp: any) => {
                    this.guardarStorage( resp.id, resp.token, resp.usuario );

                  return true;
              }));
  }


  crearUsuario( usuario: Usuario ) {

        let url = URL_SERVICIOS + '/usuario';

      return  this.http.post( url, usuario )
                .pipe(map( (resp: any) => {
                      //swal('Usuario creado', usuario.email, 'success' );
                      return resp.usuario;
                }));
  }

  actualizarUsuario( usuario: Usuario ){

    //console.log(usuario);
    let id = localStorage.getItem('id');
    let url = URL_SERVICIOS + '/usuario/' + id;

    url += '?token=' + this.token;
    console.log(url);
    return this.http.put( url, usuario )
                    .pipe(map( (resp: any) => {

                      this.guardarStorage( this.id, this.token, resp );
                      swal( 'Usaurio actualizado', usuario.nombre, 'success' );

                      return true;
                    }));

  }

  cambiarImagen( archivo: File, id: string ){

    this._subirArchivoservice.subirArchivo( archivo, 'usuarios', this.id )
          .then( (resp: any) => {
            
            this.usuario.img = resp.usuario.img;
            swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
            this.guardarStorage( this.id, this.token, this.usuario );
          })
          .catch( resp => {
            console.log( resp );
          })
  }

}
