import { Component, OnInit } from '@angular/core';
import { Maquina } from 'src/app/models/maquina.models';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaquinaService } from 'src/app/services/maquina/maquina.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-maquina',
  templateUrl: './maquina.component.html',
  styles: []
})
export class MaquinaComponent implements OnInit {

  maquina: Maquina = new Maquina('','','',false);
  
  constructor(
    public _clienteService: ClienteService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _maquinaService: MaquinaService,
  ) {
    activatedRoute.params.subscribe( params =>{

      let id= params['id'];

      if( id !== 'nuevo' ){
        this.cargarMaquina( id );
      }
    })
   }

  ngOnInit() {
  }
  cargarMaquina( id: string ){

    this._maquinaService.cargarMaquina( id )
            .subscribe( maquina => {

              this.maquina = maquina;
            });
  }
  guardarMaquina( f: NgForm ){
    if( f.invalid ){
      return;
    }
    console.log(this.maquina);
    this._maquinaService.guardarMaquina( this.maquina )
          .subscribe( maquina =>{
            this.maquina._id = maquina._id;
            this.router.navigate(['/cliente', maquina.cliente]);
            
            });
  }
  

  

}
