import { Component, OnInit } from '@angular/core';
import { Repuesto } from 'src/app/models/repuesto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RepuestoService } from '../../services/repuesto/repuesto.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-repuesto',
  templateUrl: './repuesto.component.html',
  styles: []
})
export class RepuestoComponent implements OnInit {

 
  repuesto: Repuesto = new Repuesto('','','',0);
  repuestos: Repuesto[] = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public _repuestoService: RepuestoService

  ) { 
    activatedRoute.params.subscribe( params =>{

      let id= params['id'];

      if( id !== 'nuevo' ){
        this.cargarRepuesto( id );
      }
    })
  }

  ngOnInit() {
  }

  cargarRepuesto( id: string ){
    this._repuestoService.cargarRepuesto( id )
            .subscribe( repuesto => {
              this.repuesto = repuesto;
            });
  }
  guardarRepuesto( f: NgForm ){
    if( f.invalid ){
      return;
    }
    this._repuestoService.guardarRepuesto( this.repuesto )
          .subscribe( repuesto =>{
            this.router.navigate(['/repuestos']);
          });
  }
 

}
