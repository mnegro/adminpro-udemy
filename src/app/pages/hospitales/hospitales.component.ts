import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/service.index';
import { Hospital } from '../../models/hospital.models';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number =0;
  totalRegistros: number =0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospoitales();
    this._modalUploadService.notificacion
        .subscribe( ()=> this.cargarHospoitales());
  }

  cargarHospoitales(){
    this.cargando = true;
    this._hospitalService.cargarHospitales()
          .subscribe( (hospitales:any) =>{
            this.totalRegistros = this._hospitalService.totalRegistros;
            this.hospitales = hospitales;
            this.cargando = false;
          })
  }

  buscarHospital( termino: string ){

    if( termino.length <= 0 ){
      this.cargarHospoitales();
      return;
    }

    this._hospitalService.buscarHospitales( termino )
            .subscribe( hospitales => this.hospitales= hospitales );

  }

  actualizarImagen( hospital: Hospital){
      this._modalUploadService.mostrarModal('hospitales', hospital._id );
  }

  guardarHospital( hospital: Hospital ){

    this._hospitalService.actualizarHospital(hospital)
            .subscribe();
  }

  borrarHospital( hospital: Hospital ){

    this._hospitalService.borrarHospital( hospital._id )
            .subscribe( () => this.cargarHospoitales() );
  }

  cambiarDesde(){

  }

  crearHospital(){

    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hopsital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string )=> {

      if(!valor || valor.length === 0 ){
          return;
      }

      this._hospitalService.crearHospital( valor )
                .subscribe( ()=> this.cargarHospoitales() );
    })
  }
}
