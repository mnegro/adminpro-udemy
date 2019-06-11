import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.models';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean= true;
  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
     this.cargarMedicos();
  }

  cargarMedicos(){
    this.cargando= true;
    this._medicoService.cargarMedicos()
            .subscribe( resp => {
              this.cargando= false;
              this.medicos = resp;
            });
  }

  buscarMedico( termino: string ){

    if( termino.length <= 0 ){
      this.cargarMedicos();
      return;
    }
      this._medicoService.buscarMedicos( termino )
              .subscribe( medicos => this.medicos = medicos );
  }

  borrarMedico( medico: Medico ){
    this._medicoService.borrarMedico( medico._id )
            .subscribe( ()=> this.cargarMedicos());
  }


}
