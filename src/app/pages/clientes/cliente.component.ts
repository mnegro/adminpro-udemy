import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.models';
import { Maquina } from '../../models/maquina.models';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ModalMaquinaService } from '../../components/modal-maquina/modal-maquina.service';
import { MaquinaService } from '../../services/maquina/maquina.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  cliente: Cliente = new Cliente('','','','','','');
  maquinas: Maquina[] = [];
  maquina: Maquina = new Maquina('','','',false,0,1,'','','');
  agregarmaquina: boolean = false;
  constructor(
    public _clienteService: ClienteService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _maquinaService: MaquinaService,
    public modalMaquina: ModalMaquinaService

  ) { 
    activatedRoute.params.subscribe( params =>{

      let id= params['id'];

      if( id !== 'nuevo' ){
        this.cargarCliente( id );
      }
    })
  }

  ngOnInit() {
  }

  cargarCliente( id: string ){

    this._clienteService.cargarCliente( id )
            .subscribe( cliente => {
              this.cliente = cliente;
            });
     this._maquinaService.cargarMaquinaCliente( id )
              .subscribe( maquina => {
                  this.maquinas = maquina;
              });
  }
  guardarCliente( f: NgForm ){
    if( f.invalid ){
      return;
    }

    this._clienteService.guardarCliente( this.cliente )
          .subscribe( cliente =>{
            this.cliente._id = cliente._id;
            this.router.navigate(['/cliente',this.cliente._id]);
          });
  }
  agregarMaquina(cliente: Cliente){

    this._maquinaService.cliente = cliente;
    this.router.navigate(['/maquina', 'nuevo']);
  }

  
}
