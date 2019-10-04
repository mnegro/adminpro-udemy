import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/proveedor';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from '../../services/proveedores/proveedores.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styles: []
})
export class ProveedorComponent implements OnInit {

  proveedor: Proveedor = new Proveedor('','','','','');

  constructor(
    public _proveedorService: ProveedoresService,
    public activatedRoute: ActivatedRoute,
    public router: Router

  ) { 
    activatedRoute.params.subscribe( params =>{

      let id= params['id'];

      if( id !== 'nuevo' ){
        this.cargarProveedor( id );
      }
    })
  }

  ngOnInit() {
  }

  cargarProveedor( id: string ){
    this._proveedorService.cargarProveedor( id )
            .subscribe( proveedor => {
              this.proveedor = proveedor;
            });
    
  }
  guardarProveedor( f: NgForm ){
    if( f.invalid ){
      return;
    }
    this._proveedorService.guardarProveedor( this.proveedor )
          .subscribe( proveedor =>{
            this.proveedor._id = proveedor._id;
            this.router.navigate(['/proveedor',this.proveedor._id]);
          });
  }

}
